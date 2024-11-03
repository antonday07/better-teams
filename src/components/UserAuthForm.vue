<script setup lang="ts">
// import LucideSpinner from '~icons/lucide/loader-2'
// import GitHubLogo from '~icons/radix-icons/github-logo'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginForm } from '@/composables/useLoginForm'
import SweetAlert from '@/components/common/SweetAlert.vue'

const { email, password, isLoading, onSubmit } = useLoginForm()
</script>

<template>
  <div class="grid gap-6">
    <SweetAlert title="Helloo" description="Something"></SweetAlert>
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            v-model="email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Password </Label>
          <Input
            id="email"
            v-model="password"
            placeholder="password123"
            type="password"
            auto-capitalize="none"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading"> Sign In </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
      <!-- <GitHubLogo v-else class="mr-2 h-4 w-4" /> -->
      GitHub
    </Button>
  </div>
</template>
