import _ from 'lodash';

export default function printMe() {
  console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
  );
}