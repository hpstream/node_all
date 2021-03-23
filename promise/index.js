function sleep(timer, cb) {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(cb && cb())
    }, timer);
  })
}

async function main() {
  await sleep(1000)
  console.log(1)
  await sleep(2000)
  console.log(2)
  await sleep(3000)
  console.log(3)
}
main()
