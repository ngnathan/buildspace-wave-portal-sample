const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  //   let waveCount;
  //   waveCount = await waveContract.getTotalWaves();
  //   console.log(waveCount.toNumber());

  // Owner waves
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  // Owner waves again
  let waveTxn2 = await waveContract.wave("A message 2!");
  await waveTxn2.wait(); // Wait for the transaction to be mined

  // Get Contract balance to see what happened!
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract Balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Random person waves
  //   waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  //   await waveTxn.wait(); // Wait for the transaction to be mined

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  // // Random person waves
  // console.log('Random person waves');
  // waveTxn = await waveContract.connect(randomPerson).wave();
  // await waveTxn.wait();

  // waveCount = await waveContract.getTotalWaves();
  // await waveContract.getWavesByUser(randomPerson.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
