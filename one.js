function diamondStarPattern(n) {
  for (let i = 0; i < n; i++) {
    let str = "";
    for (let j = 0; j < n - i; j++) {
      str += " ";
    }

    for (let j = i; j < 2 * i + 1; j++) {
      str += "*";
    }
    console.log(str);
  }
  for (let i = n; i < 2 * n; i++) {
    let str = "";
    for (let j = 0; j < n; j++) {
      str += " ";
    }

    for (let j = 2 * i; j > 0; j -= 2) {
      str += "*";
    }
    console.log(str);
  }
}

diamondStarPattern(5);
