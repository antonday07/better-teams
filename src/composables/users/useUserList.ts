import { pb, getAvatarUrl } from '@/services/pocketbase'
import { CustomerService } from '@/services/customer'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { reactive, ref } from 'vue'

export function useUserList() {
  const customers = ref(null)
  const users = ref(null)
  const loading = ref(false)
  const filters = ref(null)
  const statuses = reactive([
    'unqualified',
    'qualified',
    'new',
    'negotiation',
    'renewal',
    'proposal'
  ])
  const representatives = reactive([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
  ])
  async function fetchUsers() {
    try {
      const result = await pb.collection('users').getFullList({
        sort: '-created'
      })
      const mapResult = result.map((item) => {
        return {
          ...item,
          avatarUrl: getAvatarUrl(item)
        }
      })
      console.log('result:', mapResult)
      users.value = mapResult
    } catch (err) {
      console.log('err', err)
    }
  }
  async function fetchCustomers() {
    loading.value = true
    try {
      const data = await CustomerService.getCustomersLarge()
      customers.value = data
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      loading.value = false
    }
  }
  function getSeverity(status) {
    switch (status) {
      case 'unqualified':
        return 'danger'

      case 'qualified':
        return 'success'

      case 'new':
        return 'info'

      case 'negotiation':
        return 'warn'

      case 'renewal':
        return null
    }
  }
  function initFilters1() {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      username: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      //   representative: { value: null, matchMode: FilterMatchMode.IN },
      //   date: {
      //     operator: FilterOperator.AND,
      //     constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      //   },
      //   balance: {
      //     operator: FilterOperator.AND,
      //     constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
      //   },
      //   status: {
      //     operator: FilterOperator.OR,
      //     constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
      //   },
      //   activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    }
  }

  function formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  function formatDate(value) {
    if (value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  }

  return {
    customers,
    loading,
    statuses,
    users,
    filters,
    representatives,
    getSeverity,
    initFilters1,
    formatCurrency,
    formatDate,
    fetchCustomers,
    fetchUsers
  }
}
