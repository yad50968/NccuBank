var bank;

var web3;
var eth;

// 用來 log 於 底部
function log(input) {
	if (typeof input === 'object')
		$('#log').text($('#log').text() + JSON.stringify(input, null, 2) + '\n\n');
	else
		$('#log').text($('#log').text() + input + '\n\n');
	$('#log').scrollTop(document.getElementById("log").scrollHeight);
}

// 當頁面載入完成時
$(function() {
	// 連結 enode
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	eth = web3.eth;

	var contractAddress = $('#contractAddress');
	var loadDeployedContractButton = $('#loadDeployedContractButton');
	var deployedContractAddress = $('#deployedContractAddress');
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
	var generate_product1_button = $('#generate_product1_button');
	var put_p1 = $('#put_product_div');
	var amount = $('#amount');
	var installment = $('#installment');

	web3.eth.accounts.forEach(function(a) {
		whoami.append('<option value="' + a + '">' + a + '</option>');
		$("#accounts_list").append(a + '<br>');
	});
	log(web3.eth.accounts);
	log('以太帳戶');

	loadDeployedContractButton.on('click', function() {
		loadBank(web3, deployedContractAddress.val(), log, contractAddress);
	});

	// 當按下部署合約時
	deployNewContractButton.on('click', function() {
		newBank(web3, log, contractAddress);
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
						bankBalance.text('NCCU BANK (wei): ' + theAccount.bankBalance);

						put_p1.empty();
						bank.show_product1_address(whoami.val(), function(err, result) {
							if (result > '0x0000000000000000000000000000000000000000000000000000000000000000') {
								append_product_function(put_p1);
							}
						});
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

		if (!test_number(deposit.val())) {
			alert("請輸入正確金額");
		} else {

			bank.deposit({
				from: whoami.val(),
				value: web3.toWei(parseInt(deposit.val(), 10), 'ether'),
				gas: 4600000
			}, function(err, txhash) {
				if (!err) {

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
							doneTransactionStatus();
							theEvent.stopWatching();
						} else {
							log(err);
						}
					});
				} else {
					log(err);
				}
			});
		}
	});

	// 當按下提款按鍵時
	withdrawButton.on('click', function() {
		// 提款
		// withdraw 本身只有一個 args，而 { from: account, gas: ...  } 為 tx object
		if (!test_number(withdraw.val())) {
			alert("請輸入正確金額");
		} else {
			bank.withdraw(parseInt(withdraw.val(), 10), {
				from: whoami.val(),
				gas: 4600000
			}, function(err, txhash) {
				if (!err) {

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
							doneTransactionStatus();
						} else {

							log(err);
						}
					});
				} else {
					log(err);
				}
			});
		}
	});

	// 當按下轉帳按鍵時
	transferButton.on('click', function() {
		// 提款
		// withdraw 本身有兩個 args，而 { from: from, gas: ... } 為 tx object

		if (transferTo.val() === "" || !test_number(transferEtherValue.val())) {
			alert("請輸入正確金額或轉帳對象");
		} else {

			bank.transfer(transferTo.val(), parseInt(transferEtherValue.val(), 10), {
				from: whoami.val(),
				gas: 4600000
			}, function(err, txhash) {
				if (!err) {

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

							doneTransactionStatus();
						} else {
							log(err);
						}
					});
				} else {
					log(err);
				}
			});
		}
	});

	// 產生product
	generate_product1_button.on('click', function() {

		if (put_p1.html() !== "") {
			alert("已經購買 Product");
		} else {

			if (parseInt(amount.val(), 10) <= 0 || amount.val() === "" || parseInt(installment.val(), 10) === 0 || parseInt(installment.val(), 10) > 12 || installment.val() === "") {
				alert("請輸入正確金額或期數");
			} else {

				bank.create_product_1(whoami.val(), parseInt(amount.val(), 10), parseInt(installment.val(), 10), {
					from: eth.coinbase,
					gas: 4600000
				}, function(err, txhash) {
					if (!err) {
						waitTransactionStatus();

						var theEvent = bank.generate_product1_event({
							from: whoami.val()
						});
						theEvent.watch(function(err, event) {
							if (!err) {
								// 更新活動紀錄

								log(event.args);
								log('Product 產生成功');

								// 觸發更新帳戶資料
								whoamiButton.trigger('click');

								theEvent.stopWatching();

								doneTransactionStatus();
							} else {
								log(err);
							}
						});
					} else {
						log(err);
					}
				});
			}
		}
	});

});

function append_product_function(put_p1) {
	put_p1.append('<label id ="product_address"><h5>' + bank.show_product1_address($("#whoami").val()) + '</h5></label></br>' + '<button type="button" class="btn btn-default" id="product1_maturity" >合約期滿</button></div>' + '<div><input  id="product1_termainal_have_installed"type="text"placeholder="已完成期數"/>' + '<button type="button" class="btn btn-default" id="product1_terminal">提前解約</button></div>');

	// let button have onclick function
	var addmaturityButton = document.getElementById("product1_maturity");
	addmaturityButton.onclick = product1_maturity_function;

	// let button have onclick function
	var addterminalButton = document.getElementById("product1_terminal");
	addterminalButton.onclick = product1_terminal_function;
}

var product_abi = [{
	"constant": false,
	"inputs": [{
		"name": "have_installments",
		"type": "uint256"
	}],
	"name": "terminal",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "maturity",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "contractAddress",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"type": "function"
}, {
	"inputs": [{
		"name": "_who_buy",
		"type": "address"
	}, {
		"name": "_amount",
		"type": "uint256"
	}, {
		"name": "_installments",
		"type": "uint256"
	}, {
		"name": "_nccubank_address",
		"type": "address"
	}],
	"payable": false,
	"type": "constructor"
}];
var bankBytecode = '6060604052633b9aca00600055604060405190810160405280600881526020017f70726f647563743100000000000000000000000000000000000000000000000081526020015060039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009157805160ff19168380011785556100bf565b828001600101855582156100bf579182015b828111156100be5782518255916020019190600101906100a3565b5b5090506100e491905b808211156100e05760008160009055506001016100c8565b5090565b505034610000575b33600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b611168806101396000396000f3606060405236156100b2576000357c0100000000000000000000000000000000000000000000000000000000900480630b01686b146100b757806316cba9d3146100ef57806327e235e3146101125780632e1a7d4d1461014357806336effa78146101605780636638f244146101db5780636a4b3eca1461020a57806370defcbc1461022d578063a9059cbb1461025c578063b575f09a14610282578063c1d5aee4146102c9578063d0e30db0146102ec575b610000565b34610000576100ed60048080359060200190919080359060200190919080359060200190919080359060200190919050506102f6565b005b34610000576100fc61048b565b6040518082815260200191505060405180910390f35b346100005761012d60048080359060200190919050506104ab565b6040518082815260200191505060405180910390f35b346100005761015e60048080359060200190919050506104c3565b005b346100005761016d6105dd565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101cd5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3461000057610208600480803590602001909190803590602001909190803590602001909190505061067b565b005b346100005761021761080d565b6040518082815260200191505060405180910390f35b346100005761025a600480803590602001909190803590602001909190803590602001909190505061083f565b005b34610000576102806004808035906020019091908035906020019091905050610b6d565b005b346100005761029d6004808035906020019091905050610c9a565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102d6610d5e565b6040518082815260200191505060405180910390f35b6102f4610d64565b005b6000600260008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003604051808280546001816001161561010002031660029004801561037e5780601f1061035c57610100808354040283529182019161037e565b820191906000526020600020905b81548152906001019060200180831161036a575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555081818402811561000057046000600082825403925050819055508181840281156100005704600160008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508373ffffffffffffffffffffffffffffffffffffffff167fd4bcc3431a3351800f0a2bfe485932859cd914bbabc1e2cbd0f08fe84f6d3a7184848460405180848152602001838152602001828152602001935050505060405180910390a25b50505050565b60003373ffffffffffffffffffffffffffffffffffffffff163190505b90565b60016020528060005260406000206000915090505481565b6000670de0b6b3a76400008202905080600160003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561050857610000565b80600160003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050151561058257610000565b3373ffffffffffffffffffffffffffffffffffffffff167f5bb95829671915ece371da722f91d5371159095dcabf2f75cd6c53facb7e1bab8342604051808381526020018281526020019250505060405180910390a25b5050565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106735780601f1061064857610100808354040283529160200191610673565b820191906000526020600020905b81548152906001019060200180831161065657829003601f168201915b505050505081565b6000600260008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600360405180828054600181600116156101000203166002900480156107035780601f106106e1576101008083540402835291820191610703565b820191906000526020600020905b8154815290600101906020018083116106ef575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555060648183028115610000570482016000600082825403925050819055506064818302811561000057048201600160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff167fb611fad03600a807b04597ce952bcd4cdc05637352f86fa77a6de7b4a72f77738383604051808381526020018281526020019250505060405180910390a25b505050565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90565b600082600160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561087757610000565b82600160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550826000600082825401925050819055508383833060405161037480610df4833901808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f080156100005790508073ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150600260008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060036040518082805460018160011615610100020316600290048015610a2c5780601f10610a0a576101008083540402835291820191610a2c565b820191906000526020600020905b815481529060010190602001808311610a18575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508373ffffffffffffffffffffffffffffffffffffffff167f3ba82705b0cffd42275544c97398d93a0aa52e3503feee18fc5df5085909c3c684848473ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150604051808481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a25b50505050565b6000670de0b6b3a76400008202905080600160003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610bb257610000565b80600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fbabc8cd3bd6701ee99131f374fd2ab4ea66f48dc4e4182ed78fecb0502e44dd6848442604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a25b505050565b6000600260008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060036040518082805460018160011615610100020316600290048015610d225780601f10610d00576101008083540402835291820191610d22565b820191906000526020600020905b815481529060010190602001808311610d0e575b5050915050908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b60005481565b34600160003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fad40ae5dc69974ba932d08b0a608e89109412d41d04850f5196f144875ae26603442604051808381526020018281526020019250505060405180910390a25b5660606040523461000057604051608080610374833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555082600281905550816003819055505b505050505b610297806100dd6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631be1894c1461004e578063204f83f91461006b578063f6b4dfb41461007a575b610000565b346100005761006960048080359060200190919050506100b3565b005b34610000576100786101a5565b005b346100005761008761028e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16630b01686b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660025460035486604051857c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001828152602001945050505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b5050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16636638f244600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254600354604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b50565b60003090505b9056';

var bankAbi = [{
	"constant": false,
	"inputs": [{
		"name": "whobuy",
		"type": "address"
	}, {
		"name": "amount",
		"type": "uint256"
	}, {
		"name": "installments",
		"type": "uint256"
	}, {
		"name": "have_installments",
		"type": "uint256"
	}],
	"name": "product1_terminal",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
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
	"constant": true,
	"inputs": [{
		"name": "",
		"type": "address"
	}],
	"name": "balances",
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
	"name": "product_1",
	"outputs": [{
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "whobuy",
		"type": "address"
	}, {
		"name": "amount",
		"type": "uint256"
	}, {
		"name": "installments",
		"type": "uint256"
	}],
	"name": "product1_maturity",
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
		"name": "whobuy",
		"type": "address"
	}, {
		"name": "amount",
		"type": "uint256"
	}, {
		"name": "installments",
		"type": "uint256"
	}],
	"name": "create_product_1",
	"outputs": [],
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
	"constant": true,
	"inputs": [{
		"name": "user",
		"type": "address"
	}],
	"name": "show_product1_address",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "nccubank_coin",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
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
		"name": "_amount",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "_installments",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "product1_address",
		"type": "address"
	}],
	"name": "generate_product1_event",
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
		"indexed": false,
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
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "from",
		"type": "address"
	}, {
		"indexed": false,
		"name": "amount",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "installments",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "have_installments",
		"type": "uint256"
	}],
	"name": "generate_product1_terminal_event",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "from",
		"type": "address"
	}, {
		"indexed": false,
		"name": "amount",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "installments",
		"type": "uint256"
	}],
	"name": "generate_product1_maturity_event",
	"type": "event"
}];

function newBank(web3, log, contractAddress) {
	var bankContract = web3.eth.contract(bankAbi);

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
			log(contract);
			bank = contract;
			contractAddress.text('合約位址:' + bank.address);
			empty_html();
			doneTransactionStatus();
		}
	});

}

function loadBank(web3, address, log, contractAddress) {
	var bankContract = web3.eth.contract(bankAbi);
	if (address === undefined || address === null) {
		bank = bankContract.at(nccuChainBankAddress);
	} else {
		bank = bankContract.at(address);
		contractAddress.text('合約位址:' + bank.address);

	}
	empty_html();
	log(bank);
}

function empty_html() {
	var deposit = $('#deposit');
	var withdraw = $('#withdraw');
	var transferTo = $('#transferTo');
	var transferEtherValue = $('#transferEtherValue');
	var ethBalance = $('#ethBalance');
	var bankBalance = $('#bankBalance');
	var amount = $('#amount');
	var installment = $('#installment');
	var put_p1 = $('#put_product_div');

	amount.val("");
	installment.val("");
	deposit.val("");
	withdraw.val("");
	transferTo.val("");
	transferEtherValue.val("");
	ethBalance.html("以太帳戶餘額 (wei): ");
	bankBalance.html("NCCU COIN餘額 (wei): ");
	put_p1.empty();

}

function product1_maturity_function() {
	/*
	// generate product1_contract instance
	var Product1_Contract = web3.eth.contract(product_abi);
	var Product1_Contract_Instance = Product1_Contract.at($('#product_address').text());

	Product1_Contract_Instance.maturity({
			from: eth.coinbase,
			gas:4600000
		});
		
	
	$("#put_product_div").empty();
	$('#whoamiButton').trigger('click');
	*/

	var Product1_Contract = web3.eth.contract(product_abi);
	var Product1_Contract_Instance = Product1_Contract.at($('#product_address').text());
	// call product1 contract function
	Product1_Contract_Instance.maturity({
		//from: eth.coinbase,
		from: $("#whoami").val(),
		gas: 4600000
	}, function(err, result) {

		if (!err) {
			waitTransactionStatus();
			var theEvent = bank.generate_product1_maturity_event({
				from: $('#whoami').val()
			});
			theEvent.watch(function(err, event) {
				if (!err) {
					// 更新活動紀錄

					log(event.args);
					log('Product maturity成功');

					// 觸發更新帳戶資料

					$('#whoamiButton').trigger('click');
					$("#put_product_div").empty();

					theEvent.stopWatching();

					doneTransactionStatus();
				} else {
					log(err);
				}

			});
		} else {
			log(err);
		}

	});

}

function product1_terminal_function() {

	if (parseInt($("#product1_termainal_have_installed").val(), 10) > 12 || $("#product1_termainal_have_installed").val() === "") {
		alert("請確認期數");
	} else {

		/*var Product1_Contract = web3.eth.contract(product_abi);
		var Product1_Contract_Instance = Product1_Contract.at($('#product_address').text());

	
		Product1_Contract_Instance.maturity((parseInt($("#product1_termainal_have_installed").val(),10)),{
			from: eth.coinbase,
			gas:4600000
		});
		
		$("#put_product_div").empty();
		$('#whoamiButton').trigger('click');
		*/

		// generate product1_contract instance
		var Product1_Contract = web3.eth.contract(product_abi);
		var Product1_Contract_Instance = Product1_Contract.at($('#product_address').text());

		// call product1 contract function
		Product1_Contract_Instance.terminal(parseInt($("#product1_termainal_have_installed").val()), {
			//from: eth.coninbase,
			from: $("#whoami").val(),
			gas: 4600000
		}, function(err, result) {

			if (!err) {
				waitTransactionStatus();
				var theEvent = bank.generate_product1_terminal_event({
					from: $('#whoami').val()
				});
				theEvent.watch(function(err, event) {
					if (!err) {
						// 更新活動紀錄

						log(event.args);
						log('Product terminal成功');

						// 觸發更新帳戶資料
						$('#whoamiButton').trigger('click');
						$("#put_product_div").empty();
						theEvent.stopWatching();

						doneTransactionStatus();
					} else {
						log(err);
					}
				});
			} else {
				log(err);
			}

		});

	}
}

function test_number(input) {
	if (input === "" || parseInt(input, 10) === 0 || input.indexOf("-") >= 0)
		return false;
	else
		return true;
}

function waitTransactionStatus() {
	$('#accountStatus').html('帳戶狀態 <b style="color: blue">(等待交易驗證中...)</b>');
}

function doneTransactionStatus() {
	$('#accountStatus').text('帳戶狀態');
}