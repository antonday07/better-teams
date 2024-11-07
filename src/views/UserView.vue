<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import FloatLabel from 'primevue/floatlabel'
import InputIcon from 'primevue/inputicon'
import Dialog from 'primevue/dialog'
import { Form } from '@primevue/forms'
import Tag from 'primevue/tag'
import { useUserList } from '@/composables/users/useUserList'
import { onBeforeMount, onMounted } from 'vue'
import { useUser } from '@/composables/users/useUser'
const {
  customers,
  loading,
  statuses,
  users,
  filters,
  representatives,
  getSeverity,
  formatCurrency,
  fetchCustomers,
  fetchUsers,
  formatDate,
  initFilters1
} = useUserList()

const { showPopupUser, onFormSubmit, isShowPopupAddUser, formUser } = useUser(fetchUsers)

onMounted(async () => {
  fetchCustomers()
  fetchUsers()
})
initFilters1()
</script>
<template>
  <div class="card">
    <div class="flex justify-between items-center">
      <h3 class="font-semibold text-xl mb-4">List users</h3>
      <Button class="mb-4" label="Add new user" @click="showPopupUser" />
    </div>
    <DataTable
      :value="users"
      :paginator="true"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      filterDisplay="menu"
      v-model:filters="filters"
      :filters="filters"
      :loading="loading"
      :globalFilterFields="['name', 'username', 'email']"
      showGridlines
    >
      <template #header>
        <div class="flex justify-between">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column field="email" header="Email" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by email" />
        </template>
      </Column>
      <Column header="Username" filterField="username" style="min-width: 12rem">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <span>{{ data.username }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by username" />
        </template>
        <template #filterclear="{ filterCallback }">
          <Button
            type="button"
            icon="pi pi-times"
            @click="filterCallback()"
            severity="secondary"
          ></Button>
        </template>
        <template #filterapply="{ filterCallback }">
          <Button
            type="button"
            icon="pi pi-check"
            @click="filterCallback()"
            severity="success"
          ></Button>
        </template>
      </Column>
      <Column
        header="Name"
        filterField="name"
        :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img :alt="data.name" :src="`${data.avatarUrl}`" style="width: 32px" />
            <span>{{ data.name }}</span>
          </div>
        </template>
      </Column>
      <Column header="Created At" filterField="created" dataType="date" style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.created }}
          <!-- {{ formatDate(data.date) }} -->
        </template>
        <template #filter="{ filterModel }">
          <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
        </template>
      </Column>
      <!-- <Column
        header="Status"
        field="status"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
          <Select
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Select One"
            showClear
          >
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </template>
          </Select>
        </template>
      </Column> -->
      <!-- <Column
        field="activity"
        header="Activity"
        :showFilterMatchModes="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <ProgressBar :value="data.activity" :showValue="false" style="height: 6px"></ProgressBar>
        </template>
        <template #filter="{ filterModel }">
          <Slider v-model="filterModel.value" range class="m-4"></Slider>
          <div class="flex items-center justify-between px-2">
            <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
            <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
          </div>
        </template>
      </Column> -->
      <Column
        field="verified"
        header="Verified"
        dataType="boolean"
        bodyClass="text-center"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500 ': data.verified,
              'pi-times-circle text-red-500': !data.verified
            }"
          ></i>
        </template>
        <template #filter="{ filterModel }">
          <label for="verified-filter" class="font-bold"> Verified </label>
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === null"
            binary
            inputId="verified-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="isShowPopupAddUser"
    modal
    header="Add new member"
    :style="{ width: '30rem' }"
  >
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
      <div class="flex items-center gap-4 mb-4">
        <InputText
          v-model="formUser.username"
          name="username"
          type="text"
          class="flex-auto"
          placeholder="Username"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <InputText
          v-model="formUser.name"
          id="name"
          type="text"
          class="flex-auto"
          autocomplete="off"
          placeholder="Name"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <InputText
          v-model="formUser.email"
          type="email"
          id="email"
          class="flex-auto"
          autocomplete="off"
          placeholder="Email"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <InputText
          v-model="formUser.password"
          type="password"
          id="password"
          class="flex-auto"
          autocomplete="off"
          placeholder="Password"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <InputText
          v-model="formUser.passwordConfirm"
          type="password"
          id="password_confirm"
          class="flex-auto"
          autocomplete="off"
          placeholder="Password confirm"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="isShowPopupAddUser = false"
        ></Button>
        <Button type="submit" label="Create"></Button>
      </div>
    </Form>
  </Dialog>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
