<template>
  <div class="fixed top-16 w-full max-w-md mx-auto">
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-4 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg"
        >
          <span class="block truncate">{{ selectedPerson.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-lg"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in users"
              :key="person.name"
              :value="person"
              as="template"
            >
             
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ person.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-6 w-6" aria-hidden="true" />
                </span>

              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
  <Menu>
    <MenuButton>More</MenuButton>

    <!-- Use Vue's built-in `transition` element to add transitions. -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
    <MenuItems>
      <MenuItem v-slot="{ close }">
        <MyCustomLink href="/" @click="close">Read and accept</MyCustomLink>
      </MenuItem>
    </MenuItems>
    </transition>
  </Menu>

  <div id="test">
    <ul>
      <li v-for="user in users" :key="user.id">

        <div class="max-w-sm rounded overflow-hidden shadow-lg">
  
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{ user.name }}</div>
    <p class="text-gray-700 text-base">
      {{ user.name }}  is : {{ user.age }} years old
     </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <button @click="RemoveUser(user.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Remove
</button>
  </div>
</div>
      
        

      </li>
    </ul>
  </div> 
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Menu,
   MenuButton,
    MenuItems,
     MenuItem
} from '@headlessui/vue';
  
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import eventBus from '@/Services/eventbus';
const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ]
export default {
  name: 'Users',
  props: ['users'],
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Menu,
    MenuButton,
     MenuItems,
      MenuItem,
    CheckIcon,
    ChevronUpDownIcon,
  },
  data() {
    return {
      selectedPerson: this.users[0] || {},
    };
  },
  methods:{
    RemoveUser(userId){
      eventBus.emit("RemoveUser", userId);
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
}

li {
  list-style-type: none;
}
#test{
  margin-left: 50%
}
</style>
