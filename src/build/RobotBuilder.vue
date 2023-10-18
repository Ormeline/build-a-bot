<template>
  <div class="content">
    <button @click="addToBasket()" type="button" class="add-to-basket">Add to basket</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>
        <img :src="selectedRobot.head.src" title="head" alt="head" />
        <button @click="selectPrevHead()" type="button" class="prev-selector">&#9660;</button>
        <button @click="selectNextHead()" type="button" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" alt="Arm Articulated Claw" />
        <button @click="selectPrevLeftArm()" type="button" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" type="button" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" alt="Torso Flexible Gauged" />
        <button @click="selectPrevTorso()" type="button" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" type="button" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" alt="Arm Articulated Claw" />
        <button @click="selectPrevRightArm()" type="button" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" type="button" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" alt="Base Double Wheel" />
        <button @click="selectPrevBase()" type="button" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" type="button" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div>
      <h1>Basket</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in basket" :key="index">
            <td>{{ robot.title }}</td>
            <td class="cost">{{ robot.cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import availableParts from '../data/parts';
import createdHookMixin from './created-hook-mixin';

function getPrevValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

export default {
  name: 'RobotBuilder',
  created() {
    console.log('component created');
  },
  data() {
    return {
      availableParts,
      basket: [],
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedRightArmIndex: 0,
      selectedBaseIndex: 0,
    };
  },
  mixins: [createdHookMixin],
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
    headBorderStyle() {
      return {
        border: this.selectedRobot.head.onSale ? '3px solid red' : '3px solid #aaa',
      };
    },

    selectedRobot() {
      return {
        head: availableParts.heads[this.selectedHeadIndex],
        leftArm: availableParts.arms[this.selectedLeftArmIndex],
        torso: availableParts.torsos[this.selectedTorsoIndex],
        rightArm: availableParts.arms[this.selectedRightArmIndex],
        base: availableParts.bases[this.selectedBaseIndex],
      };
    },
  },

  methods: {
    addToBasket() {
      const robot = this.selectedRobot;
      const cost =
        robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;
      this.basket.push({
        title: robot.head.title,
        leftArm: robot.leftArm,
        torso: robot.torso,
        rightArm: robot.rightArm,
        base: robot.base,
        cost,
      });
    },
    selectNextHead() {
      this.selectedHeadIndex = getNextValidIndex(
        this.selectedHeadIndex,
        availableParts.heads.length,
      );
    },
    selectPrevHead() {
      this.selectedHeadIndex = getPrevValidIndex(
        this.selectedHeadIndex,
        availableParts.heads.length,
      );
    },
    selectNextLeftArm() {
      this.selectedLeftArmIndex = getNextValidIndex(
        this.selectedLeftArmIndex,
        availableParts.arms.length,
      );
    },
    selectPrevLeftArm() {
      this.selectedLeftArmIndex = getPrevValidIndex(
        this.selectedLeftArmIndex,
        availableParts.arms.length,
      );
    },
    selectNextTorso() {
      this.selectedTorsoIndex = getNextValidIndex(
        this.selectedTorsoIndex,
        availableParts.torsos.length,
      );
    },
    selectPrevTorso() {
      this.selectedTorsoIndex = getNextValidIndex(
        this.selectedTorsoIndex,
        availableParts.torsos.length,
      );
    },
    selectNextRightArm() {
      this.selectedRightArmIndex = getNextValidIndex(
        this.selectedRightArmIndex,
        availableParts.arms.length,
      );
    },
    selectPrevRightArm() {
      this.selectedRightArmIndex = getPrevValidIndex(
        this.selectedRightArmIndex,
        availableParts.arms.length,
      );
    },
    selectNextBase() {
      this.selectedBaseIndex = getNextValidIndex(
        this.selectedBaseIndex,
        availableParts.bases.length,
      );
    },
    selectPrevBase() {
      this.selectedBaseIndex = getPrevValidIndex(
        this.selectedBaseIndex,
        availableParts.bases.length,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part img {
  width: 165px;
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: #bf0707;
  font-weight: bold;
}
.content {
  position: relative;
}
.add-to-basket {
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}
td,
th {
  text-align: right;
  padding: 1px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border {
  border: 3px solid red;
}
</style>
