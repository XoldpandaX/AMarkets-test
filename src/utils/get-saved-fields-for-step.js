/**
 * get form fields obj file and get from it all decorator values
 * (v-model of form fields)
 */
export default function (fieldObj, initValues) {
  const formFields = Object.values(fieldObj).flat().map(({ decorator }) => decorator[0]);

  return formFields.reduce((acc, next) => {
    const val = initValues[next];
    return val ? { ...acc, [next]: val } : { ...acc };
  }, {});
}
