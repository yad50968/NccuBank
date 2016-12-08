var bank;

$(function() {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	var eth = web3.eth;

	function log(input) {
		if (typeof input === 'object') {
			input = JSON.stringify(input, null, 2);
		}
		logger.html(input + '\n' + logger.html());
	}

	var contractAddress = $('#contractAddress');
	var deployedContractAddress = $('#deployedContractAddress');
	var loadDeployedContractButton = $('#loadDeployedContractButton');
	var deployNewContractButton = $('#deployNewContractButton');
	var whoami = $('#whoami');
	var whoamiButton = $('#whoamiButton');
	var transferTo = $('#transferTo');
	var transferNccuValue = $('#transferNccuValue');
	var transferButton = $('#transferButton');
	var logger = $('#logger');
	var search = $('#search');
	var bankBalance = $('#bankBalance');
	var mintButton = $('#mintButton');
	var mintTo = $('#mintTo');
	var mintNccuValue = $('#mintNccuValue');
	// 載入使用者至 select tag
	web3.eth.accounts.forEach(function(a) {
		whoami.append('<option value="' + a + '">' + a + '</option>');
	});

	log(web3.eth.accounts);
	log('以太帳戶');

	// 當按下載入既有合約位址時
	loadDeployedContractButton.on('click', function() {
		loadBank(web3, deployedContractAddress.val(), log, contractAddress);
	});

	// 當按下部署合約時
	deployNewContractButton.on('click', function() {
		newBank(web3, log, contractAddress, deployedContractAddress);
	});
	whoami.on('change', function() {
  		whoami = $('#whoami');
	})
	
	search.on('click',function() {
			
			bank.check({
				from: whoami.val()
			}, function(err, result) {
				if(!err){
					
					bankBalance.text('NCCU COIN餘額: ' + result);
					log('NCCU COIN餘額: ' + result);
				}else {
					alert(err);
				}
			})
		})
	
		// 當按下mint按鍵時
	mintButton.on('click', function() {
		bank.mint(mintTo.val(), parseInt(mintNccuValue.val(), 10), {
			from: whoami.val(),
			gas: 4600000
		}, function(err, txhash) {
			if (!err) {
				log('mint錢成功')
			} else {
				log(err);
			}
		});
	});
	
	transferButton.on('click', function() {
		bank._send(transferTo.val(), parseInt(transferNccuValue.val(), 10), {
			from: whoami.val(),
			gas: 4600000
		}, function(err, txhash) {
			if (!err) {
				var theEvent = bank.Sent({
					from: whoami.val()
				});
				theEvent.watch(function(err, event) {
					if (!err) {
						log(event.args);
						log('轉帳成功');

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
var bankAbi =[{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"check","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"_send","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"}]
var bankBytecode = '606060405234610000575b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b6103a5806100576000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063075461721461006457806327e235e31461009d57806340c10f19146100ce578063919840ad1461010a5780639d0617f91461012d575b610000565b3461000057610071610169565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576100b8600480803590602001909190505061018f565b6040518082815260200191505060405180910390f35b34610000576100f260048080359060200190919080359060200190919050506101a7565b60405180821515815260200191505060405180910390f35b346100005761011761024b565b6040518082815260200191505060405180910390f35b3461000057610151600480803590602001909190803590602001909190505061027d565b60405180821515815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915090505481565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102095760009050610245565b81600160008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550600190505b92915050565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156102b9576000905061039f565b81600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507f3990db2d31862302a685e8086b5755072a6e2b5b780af1ee81ece35ee3cd3345338484604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a1600190505b9291505056';

function loadBank(web3, address, log, contractAddress) {
	var bankContract = web3.eth.contract(bankAbi);
	if (address === undefined || address === null) {
		bank = bankContract.at(nccuChainBankAddress);
	} else {
		bank = bankContract.at(address);
		contractAddress.text('合約位址:' + bank.address);
		
	}
	
	console.log(bank);
	log(bank);
}

function newBank(web3, log, contractAddress, deployedContractAddress) {
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
			contractAddress.text('合約位址:' + bank.address);
			deployedContractAddress.val(bank.address);
	

			// 更新介面
			doneTransactionStatus();
		}
	});
}

function waitTransactionStatus() {
	$('#accountStatus').html('選擇帳戶 帳戶狀態 <b style="color: blue">(等待交易驗證中...)</b>');
}

function doneTransactionStatus() {
	$('#accountStatus').text('選擇帳戶 ');
}