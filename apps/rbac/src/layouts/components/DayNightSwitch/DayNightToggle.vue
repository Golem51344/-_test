<script setup lang="ts">
defineOptions({
  name: 'DayNightToggle',
});
const enabled = defineModel();
</script>

<template>
  <div flex justify-center pb-15px>
    <div class="toggleWrapper">
      <input
        id="dn"
        v-model="enabled"
        type="checkbox"
        class="dn"
      >
      <label for="dn" class="toggle">
        <span class="toggle__handler">
          <span class="crater crater--1" />
          <span class="crater crater--2" />
          <span class="crater crater--3" />
        </span>
        <span class="star star--1" />
        <span class="star star--2" />
        <span class="star star--3" />
        <span class="star star--4" />
        <span class="star star--5" />
        <span class="star star--6" />
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toggleWrapper {
  overflow: hidden;
  transform: scale(0.5);
}

.toggleWrapper input {
  position: absolute;
  left: -99em;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 50px;
  cursor: pointer;
  background-color: #83d8ff;
  border-radius: 84px;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.toggle::before {
  position: absolute;
  top: 15px;
  left: -50px;
  font-size: 18px;
  content: "Day";
}

.toggle::after {
  position: absolute;
  top: 15px;
  right: -60px;
  font-size: 18px;
  color: #384f6d;
  content: "Night";
}

.toggle__handler {
  position: relative;
  top: 3px;
  left: 3px;
  z-index: 1;
  display: inline-block;
  width: 44px;
  height: 44px;
  background-color: #ffdb98;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotate(-45deg);
}

.toggle__handler .crater {
  position: absolute;
  background-color: #e8cda5;
  border-radius: 100%;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}

.toggle__handler .crater--1 {
  top: 18px;
  left: 10px;
  width: 4px;
  height: 4px;
}

.toggle__handler .crater--2 {
  top: 28px;
  left: 22px;
  width: 6px;
  height: 6px;
}

.toggle__handler .crater--3 {
  top: 10px;
  left: 25px;
  width: 8px;
  height: 8px;
}

.star {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--1 {
  top: 10px;
  left: 35px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--2 {
  top: 18px;
  left: 28px;
  z-index: 1;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 40px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

.star--5 {
  top: 32px;
  left: 17px;
  z-index: 0;
  width: 3px;
  height: 3px;
  transform: translate3d(3px, 0, 0);
}

.star--6 {
  top: 36px;
  left: 28px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

input:checked + .toggle {
  background-color: #749dd6;
}

input:checked + .toggle::before {
  color: #749ed7;
}

input:checked + .toggle::after {
  color: #fff;
}

input:checked + .toggle .toggle__handler {
  background-color: #ffe5b5;
  transform: translate3d(40px, 0, 0) rotate(0);
}

input:checked + .toggle .toggle__handler .crater {
  opacity: 1;
}

input:checked + .toggle .star--1 {
  width: 2px;
  height: 2px;
}

input:checked + .toggle .star--2 {
  width: 4px;
  height: 4px;
  transform: translate3d(-5px, 0, 0);
}

input:checked + .toggle .star--3 {
  width: 2px;
  height: 2px;
  transform: translate3d(-7px, 0, 0);
}

input:checked + .toggle .star--4,
input:checked + .toggle .star--5,
input:checked + .toggle .star--6 {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

input:checked + .toggle .star--4 {
  transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

input:checked + .toggle .star--5 {
  transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

input:checked + .toggle .star--6 {
  transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
