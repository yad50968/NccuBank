var bank;

// please launch geth locally and unlock your accounts first
$(function() {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	var eth = web3.eth;

	function log(input) {
		if (typeof input === 'object') {
			input = JSON.stringify(input, null, 2);
		}
		logger.html(input + '\n' + logger.html());
	}

	var contractAddressH5 = $('#contractAddressH5');
	var deployedContractAddressInput = $('#deployedContractAddressInput');
	var loadDeployedContractButton = $('#loadDeployedContractButton');
	var deployNewContractButton = $('#deployNewContractButton');
	var whoami = $('#whoami');
	var whoamiButton = $('#whoamiButton');
	var deposit = $('#deposit');
	var depositButton = $('#depositButton');
	var withdraw = $('#withdraw');
	var withdrawButton = $('#withdrawButton');
	var transferTo = $('#transferTo');
	var transferEtherValue = $('#transferEtherValue');
	var transferButton = $('#transferButton');
	var ethBalance = $('#ethBalance');
	var bankBalance = $('#bankBalance');
	var logger = $('#logger');

	// 載入使用者至 select tag
	web3.eth.accounts.forEach(function(a) {
		whoami.append('<option value="' + a + '">' + a + '</option>');
	});

	log(web3.eth.accounts);
	log('以太帳戶');

	// 當按下載入既有合約位址時
	loadDeployedContractButton.on('click', function() {
		loadBank(web3, log, deployedContractAddressInput.val(), contractAddressH5);
	});

	// 當按下部署合約時
	deployNewContractButton.on('click', function() {
		newBank(web3, log, contractAddressH5, deployedContractAddressInput);
	});

	// 當按下登入按鍵時
	whoamiButton.on('click', function() {
		// 先取得 etherBalance
		eth.getBalance(whoami.val(), function(err, _ethBalance) {
			if (!err) {
				// 再取得 bank balance
				// { from: account } 為 tx object
				bank.checkBankBalance({
					from: whoami.val()
				}, function(err, _bankBalance) {
					if (!err) {
						var theAccount = {
							address: whoami.val(),
							ethBalance: _ethBalance,
							bankBalance: _bankBalance
						};
						// 更新活動紀錄
						log(theAccount);
						log('更新帳戶資料');

						ethBalance.text('以太帳戶餘額 (wei): ' + theAccount.ethBalance);
						bankBalance.text('銀行合約餘額 (wei): ' + theAccount.bankBalance);

						// 更新介面
						doneTransactionStatus();
					} else {
						log(err);
						log('請檢查帳戶位址及銀行合約餘額');
					}
				});
			} else {
				log(err);
				log('請檢查帳戶位址及銀行合約餘額');
			}
		});
	});

	// 當按下存款按鍵時
	depositButton.on('click', function() {
		// 存款
		// 而 deposit 雖然本身沒有 args，但是需要透過描述 tx object 來達成送錢與表明自己的身分 (以哪個帳戶的名義)
		bank.deposit({
			from: whoami.val(),
			value: web3.toWei(parseInt(deposit.val(), 10), 'ether'),
			gas: 4600000
		}, function(err, txhash) {
			if (!err) {
				// 更新介面
				waitTransactionStatus();

				var theEvent = bank.DepositEvent({
					from: whoami.val()
				});
				theEvent.watch(function(err, event) {
					if (!err) {
						// 更新活動紀錄
						log(event.args);
						log('存款成功');

						// 觸發更新帳戶資料
						whoamiButton.trigger('click');

						theEvent.stopWatching();
					} else {
						log(err);
					}
				});
			} else {
				log(err);
			}
		});
	});

	// 當按下提款按鍵時
	withdrawButton.on('click', function() {
		// 提款
		// withdraw 本身只有一個 args，而 { from: account, gas: ...  } 為 tx object
		bank.withdraw(parseInt(withdraw.val(), 10), {
			from: whoami.val(),
			gas: 4600000
		}, function(err, txhash) {
			if (!err) {
				// 更新介面
				waitTransactionStatus();

				var theEvent = bank.WithdrawEvent({
					from: whoami.val()
				});
				theEvent.watch(function(err, event) {
					if (!err) {
						// 更新活動紀錄
						log(event.args);
						log('提款成功');

						// 觸發更新帳戶資料
						whoamiButton.trigger('click');

						theEvent.stopWatching();
					} else {
						log(err);
					}
				});
			} else {
				log(err);
			}
		});
	});

	// 當按下轉帳按鍵時
	transferButton.on('click', function() {
		// 提款
		// withdraw 本身有兩個 args，而 { from: from, gas: ... } 為 tx object
		bank.transfer(transferTo.val(), parseInt(transferEtherValue.val(), 10), {
			from: whoami.val(),
			gas: 4600000
		}, function(err, txhash) {
			if (!err) {
				// 更新介面
				waitTransactionStatus();

				var theEvent = bank.TransferEvent({
					from: whoami.val()
				});
				theEvent.watch(function(err, event) {
					if (!err) {
						// 更新活動紀錄
						log(event.args);
						log('轉帳成功');

						// 觸發更新帳戶資料
						whoamiButton.trigger('click');

						theEvent.stopWatching();
					} else {
						log(err);
					}
				});
			} else {
				log(err);
			}
		});
	});
});

var bankAbi = [{
	"constant": true,
	"inputs": [],
	"name": "checkEtherBalance",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "etherValue",
		"type": "uint256"
	}],
	"name": "withdraw",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "checkBankBalance",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "to",
		"type": "address"
	}, {
		"name": "etherValue",
		"type": "uint256"
	}],
	"name": "transfer",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "deposit",
	"outputs": [],
	"payable": true,
	"type": "function"
}, {
	"inputs": [],
	"payable": false,
	"type": "constructor"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "from",
		"type": "address"
	}, {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "timestamp",
		"type": "uint256"
	}],
	"name": "DepositEvent",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "from",
		"type": "address"
	}, {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "timestamp",
		"type": "uint256"
	}],
	"name": "WithdrawEvent",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "from",
		"type": "address"
	}, {
		"indexed": true,
		"name": "to",
		"type": "address"
	}, {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "timestamp",
		"type": "uint256"
	}],
	"name": "TransferEvent",
	"type": "event"
}];

var bankBytecode = '606060405234610000575b60008054600160a060020a0319166c01000000000000000000000000338102041790555b5b6102b08061003d6000396000f3606060405260e060020a600035046316cba9d3811461004a5780632e1a7d4d146100695780636a4b3eca1461007b578063a9059cbb1461009a578063d0e30db0146100af575b610000565b34610000576100576100b9565b60408051918252519081900360200190f35b34610000576100796004356100c8565b005b346100005761005761018c565b60408051918252519081900360200190f35b34610000576100796004356024356101a9565b005b61007961024e565b005b600160a060020a033316315b90565b600160a060020a033316600090815260016020526040902054670de0b6b3a7640000820290819010156100fa57610000565b604051600160a060020a0333169082156108fc029083906000818181858888f19350505050151561012a57610000565b600160a060020a033316600081815260016020908152604091829020805485900390558151858152429181019190915281517f5bb95829671915ece371da722f91d5371159095dcabf2f75cd6c53facb7e1bab929181900390910190a25b5050565b600160a060020a0333166000908152600160205260409020545b90565b600160a060020a033316600090815260016020526040902054670de0b6b3a7640000820290819010156101db57610000565b600160a060020a033381166000818152600160209081526040808320805487900390559387168083529184902080548601905583518681524291810191909152835191937fbabc8cd3bd6701ee99131f374fd2ab4ea66f48dc4e4182ed78fecb0502e44dd692918290030190a35b505050565b600160a060020a0333166000818152600160209081526040918290208054349081019091558251908152429181019190915281517fad40ae5dc69974ba932d08b0a608e89109412d41d04850f5196f144875ae2660929181900390910190a25b56';

function loadBank(web3, log, address, contractAddressH5) {
	var bankContract = web3.eth.contract(bankAbi);
	if (!(address === undefined || address === null || address === '')) {
		bank = bankContract.at(address);
		contractAddressH5.text('合約位址:' + bank.address);
		console.log(bank);
		log(bank);
	}
}

function newBank(web3, log, contractAddressH5, deployedContractAddressInput) {
	var bankContract = web3.eth.contract(bankAbi);
	// 更新介面
	waitTransactionStatus();

	bankContract.new({
		from: web3.eth.accounts[0],
		data: bankBytecode,
		gas: 4700000
	}, function(err, contract) {
		if (err) {
			console.log(err);
		}
		if (contract.address !== undefined) {
			console.log('New Bank is at', contract.address);
			log(contract);
			bank = contract;
			
			// 更新合約介面
			contractAddressH5.text('合約位址:' + bank.address);
			deployedContractAddressInput.val(bank.address);

			// 更新介面
			doneTransactionStatus();
		}
	});
}

function waitTransactionStatus() {
	$('#accountStatus').html('帳戶狀態 <b style="color: blue">(等待交易驗證中...)</b>');
}

function doneTransactionStatus() {
	$('#accountStatus').text('帳戶狀態');
}