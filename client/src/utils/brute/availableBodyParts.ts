export interface BodyParts {
  longHair: number,
  lowerRightArm: number,
  rightHand: number,
  upperRightArm: number,
  rightShoulder: number,
  rightFoot: number,
  lowerRightLeg: number,
  upperRightLeg: number,
  leftFoot: number,
  lowerLeftLeg: number,
  pelvis: number,
  upperLeftLeg: number,
  tummy: number,
  torso: number,
  head: number,
  leftHand: number,
  upperLeftArm: number,
  lowerLeftArm: number,
  leftShoulder: number,
}

const availableBodyParts: { male: BodyParts, female: BodyParts } = {
  male: {
    longHair: 0,
    lowerRightArm: 1,
    rightHand: 1,
    upperRightArm: 1,
    rightShoulder: 1,
    rightFoot: 1,
    lowerRightLeg: 1,
    upperRightLeg: 1,
    leftFoot: 1,
    lowerLeftLeg: 1,
    pelvis: 1,
    upperLeftLeg: 1,
    tummy: 1,
    torso: 1,
    head: 1,
    leftHand: 1,
    upperLeftArm: 1,
    lowerLeftArm: 1,
    leftShoulder: 1,
  },
  female: {
    longHair: 2,
    lowerRightArm: 1,
    rightHand: 1,
    upperRightArm: 1,
    rightShoulder: 1,
    rightFoot: 1,
    lowerRightLeg: 1,
    upperRightLeg: 1,
    leftFoot: 1,
    lowerLeftLeg: 1,
    pelvis: 1,
    upperLeftLeg: 1,
    tummy: 1,
    torso: 1,
    head: 1,
    leftHand: 1,
    upperLeftArm: 1,
    lowerLeftArm: 1,
    leftShoulder: 1,
  },
};

export default availableBodyParts;