import ty from './plugins/mm';

ty();

var test = () => {
  console.log(12345);
  return "hahahahahah";
};

var mm = `
<html>
  <body>
    <div class="ty">669996999 + ${test()}</div>
  </body>
</html>
`;

var li = 'as666d',
  op = 45;

const obj = {
  li,
  op
};
console.log(obj);
console.log(mm);

var ss = Array.from(new Set([12,25,22,55,25]))
console.log(ss);