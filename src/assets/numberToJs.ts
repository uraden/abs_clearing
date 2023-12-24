export function numToWords(n: any) {
  if (n < 0) return false;
  let single_digit = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];
  let double_digit = [
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];
  let below_hundred = [
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  let triple_digit = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  if (n === 0) return "Zero";
  function translate(n: any) {
    let word = "";
    if (n < 10) {
      word = single_digit[n] + " ";
    } else if (n < 20) {
      word = double_digit[n - 10] + " ";
    } else if (n < 100) {
      let rem = translate(n % 10);
      word = below_hundred[(n - (n % 10)) / 10 - 2] + " " + rem;
    } else if (n < 1000) {
      word = triple_digit[Math.trunc(n / 100)] + " " + translate(n % 100);
      // single_digit[Math.trunc(n / 100)] + " сот " + translate(n % 100);
    } else if (n < 1000000) {
      // @ts-ignore
      word =
        // @ts-ignore
        translate(parseInt(n / 1000)).trim() + " тысяча " + translate(n % 1000);
    } else if (n < 1000000000) {
      word =
        // @ts-ignore
        translate(parseInt(n / 1000000)).trim() +
        " миллион " +
        translate(n % 1000000);
    } else {
      word =
        // @ts-ignore
        translate(parseInt(n / 1000000000)).trim() +
        " миллиард " +
        translate(n % 1000000000);
    }
    return word;
  }
  let result = translate(n);
  return result.trim();
}

export function withDecimal(n: any) {
  // var nums = (Math.round((n + Number.EPSILON) * 100) / 100)
  //   .toString()
  //   .split(".");
  var nums = n.toString().split(".");
  // console.log('nums:::  ', nums);
  var whole = numToWords(nums[0]);
  if (nums.length == 2) {
    // console.log('nums[1]: ', nums[1], Math.round((n + Number.EPSILON) * 100) / 100);
    var fraction = numToWords(nums[1]);
    console.log('farcccc: ', fraction, nums);
    return whole + " сум " + fraction + " тийин";
  } else {
    return whole + " сум";
  }
}
