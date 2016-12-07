var bank;

var product1_abi =[{"constant":false,"inputs":[{"name":"have_installments","type":"uint256"}],"name":"terminal","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"maturity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_who_buy","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_installments","type":"uint256"},{"name":"_nccubank_address","type":"address"}],"payable":false,"type":"constructor"}]

var bankBytecode = '60606040526298968060005573ca35b7d915458ef540ade6068dfe2f44e8fa733c600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507314723a09acff6d2a60dcdf7aa4aff308fddc160c600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550604060405190810160405280600881526020017f70726f647563743100000000000000000000000000000000000000000000000081526020015060059080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013257805160ff1916838001178555610160565b82800160010185558215610160579182015b8281111561015f578251825591602001919060010190610144565b5b50905061018591905b80821115610181576000816000905550600101610169565b5090565b505034610000575b33600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b6111a8806101da6000396000f3606060405236156100c8576000357c0100000000000000000000000000000000000000000000000000000000900480630b01686b146100cd57806316cba9d31461010557806327e235e3146101285780632e1a7d4d1461015957806336effa78146101765780636638f244146101f15780636a4b3eca1461022057806370defcbc14610243578063a9059cbb14610272578063ac1717b014610298578063b575f09a146102d1578063b9edb1af14610318578063c1d5aee414610351578063d0e30db014610374575b610000565b3461000057610103600480803590602001909190803590602001909190803590602001909190803590602001909190505061037e565b005b34610000576101126104b9565b6040518082815260200191505060405180910390f35b346100005761014360048080359060200190919050506104d9565b6040518082815260200191505060405180910390f35b346100005761017460048080359060200190919050506104f1565b005b3461000057610183610612565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101e35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346100005761021e60048080359060200190919080359060200190919080359060200190919050506106b0565b005b346100005761022d6107ec565b6040518082815260200191505060405180910390f35b3461000057610270600480803590602001909190803590602001909190803590602001909190505061081e565b005b34610000576102966004808035906020019091908035906020019091905050610b53565b005b34610000576102a5610c87565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102ec6004808035906020019091905050610cad565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610325610d71565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761035e610d97565b6040518082815260200191505060405180910390f35b61037c610d9d565b005b6000600260008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600560405180828054600181600116156101000203166002900480156104065780601f106103e4576101008083540402835291820191610406565b820191906000526020600020905b8154815290600101906020018083116103f2575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508181830384028115610000570460006000828254039250508190555081818303840281156100005704600160008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b50505050565b60003373ffffffffffffffffffffffffffffffffffffffff163190505b90565b60016020528060005260406000206000915090505481565b6000670de0b6b3a76400008202905080600160003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561053657610000565b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050151561057957610000565b80600160003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055507f5bb95829671915ece371da722f91d5371159095dcabf2f75cd6c53facb7e1bab338342604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a15b5050565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106a85780601f1061067d576101008083540402835291602001916106a8565b820191906000526020600020905b81548152906001019060200180831161068b57829003601f168201915b505050505081565b6000600260008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600560405180828054600181600116156101000203166002900480156107385780601f10610716576101008083540402835291820191610738565b820191906000526020600020905b815481529060010190602001808311610724575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555060648183028115610000570482016000600082825403925050819055506064818302811561000057048201600160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b505050565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90565b600082600160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561085657610000565b82600160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550826000600082825401925050819055508383833060405161037480610e34833901808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f080156100005790508073ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150600260008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060056040518082805460018160011615610100020316600290048015610a0b5780601f106109e9576101008083540402835291820191610a0b565b820191906000526020600020905b8154815290600101906020018083116109f7575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507f3ba82705b0cffd42275544c97398d93a0aa52e3503feee18fc5df5085909c3c68484848473ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390a15b50505050565b6000670de0b6b3a76400008202905080600160003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610b9857610000565b80600160003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507fbabc8cd3bd6701ee99131f374fd2ab4ea66f48dc4e4182ed78fecb0502e44dd633848442604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200194505050505060405180910390a15b505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060056040518082805460018160011615610100020316600290048015610d355780601f10610d13576101008083540402835291820191610d35565b820191906000526020600020905b815481529060010190602001808311610d21575b5050915050908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b34600160003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507fad40ae5dc69974ba932d08b0a608e89109412d41d04850f5196f144875ae2660333442604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a15b5660606040523461000057604051608080610374833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555082600281905550816003819055505b505050505b610297806100dd6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631be1894c1461004e578063204f83f91461006b578063f6b4dfb41461007a575b610000565b346100005761006960048080359060200190919050506100b3565b005b34610000576100786101a5565b005b346100005761008761028e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16630b01686b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660025460035486604051857c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001828152602001945050505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b5050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16636638f244600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254600354604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b50565b60003090505b9056';

var bankAbi = [{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"},{"name":"have_installments","type":"uint256"}],"name":"product1_terminal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkEtherBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"etherValue","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"product_1","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"}],"name":"product1_maturity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkBankBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"}],"name":"create_product_1","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"etherValue","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"user1","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"show_product1_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"user2","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nccubank_coin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_who_buy","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_installments","type":"uint256"},{"indexed":false,"name":"product1_address","type":"address"}],"name":"generate_product1_event","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"DepositEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"WithdrawEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"TransferEvent","type":"event"}]

var web3;
var eth;


// 用來 log 於 底部
function log(input) {
	if (typeof input === 'object')
		$('#log').text($('#log').text() + JSON.stringify(input, null, 2) + '\n\n');
	else
		$('#log').text($('#log').text() + input + '\n\n');
	$('#log').scrollTop(document.getElementById("log").scrollHeight)
}

// 當頁面載入完成時
$(function() {
	// 連結 enode
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
	eth = web3.eth

	
	var now_account ;
	var contractAddress = $('#contractAddress');
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
	
	web3.eth.accounts.forEach(function(a) {
		whoami.append('<option value="' + a + '">' + a + '</option>');
		$("#accounts_list").append(a+'<br>');
	});
	log(web3.eth.accounts);
	log('以太帳戶');
	
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
						
						now_account = whoami.val();
						ethBalance.text('以太帳戶餘額 (wei): ' + theAccount.ethBalance);
						bankBalance.text('銀行合約餘額 (wei): ' + theAccount.bankBalance);
						
						$("#put_p1").empty();	bank.show_product1_address(whoami.val(),function(err,result){
							if(result > '0x0000000000000000000000000000000000000000000000000000000000000000'){
								append_product_function();
							}
						})
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
		
		if(!test_number(deposit.val())){
			alert("請輸入正確金額");
		}else {
			
			bank.deposit({
				from: whoami.val(),
				value: web3.toWei(parseInt(deposit.val(), 10), 'ether'),
				gas: 4600000
			}, function(err, txhash) {
				if (!err) {
					var theEvent = bank.DepositEvent({});
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
		}
	});

	// 當按下提款按鍵時
	withdrawButton.on('click', function() {
		// 提款
		// withdraw 本身只有一個 args，而 { from: account, gas: ...  } 為 tx object
		if(!test_number(withdraw.val())){
			alert("請輸入正確金額");
		}else {
			bank.withdraw(parseInt(withdraw.val(), 10), {
				from: whoami.val(),
				gas: 4600000
			}, function(err, txhash) {
				if (!err) {
					var theEvent = bank.WithdrawEvent({});
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
		}
	});

	// 當按下轉帳按鍵時
	transferButton.on('click', function() {
		// 提款
		// withdraw 本身有兩個 args，而 { from: from, gas: ... } 為 tx object
		
		if( transferTo.val() =="" || test_number(transferTo.val())){
			   alert("請輸入正確金額或轉帳對象");
		}else{
		
			bank.transfer(transferTo.val(), parseInt(transferEtherValue.val(), 10), {
				from: whoami.val(),
				gas: 4600000
			}, function(err, txhash) {
				if (!err) {
					var theEvent = bank.TransferEvent({});
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
		}
	});
	
	// 按產生product1
	generate_product1_button.on('click', function() {
		
		if(!$("#put_p1").html() == ""){
			alert("已經購買 Product");
		}else{
			
			if(parseInt($('#amount').val())<= 0 || $('#amount').val() =="" || parseInt($('#installment').val())==0 ||parseInt($('#installment').val())>12 || $('#installment').val() ==""){
			   alert("請輸入正確金額或期數");
			}else{
			
				 bank.create_product_1(now_account,parseInt($('#amount').val()),parseInt($('#installment').val()),{
					 from: eth.coinbase,
					 gas: 4600000
				 },function(){
					 var theEvent = bank.generate_product1_event({});
					 theEvent.watch(function(err, event) {
							if (!err) {
								// 更新活動紀錄


								log(event.args);
								log('Product 產生成功');

								// 觸發更新帳戶資料
								whoamiButton.trigger('click');

								theEvent.stopWatching();
							} else {
								log(err);
							}
						});
				 })
			}
		 }
	})


});


function append_product_function(){
	$("#put_p1").append('<label id ="product_address"><h5>'+bank.show_product1_address($("#whoami").val())+'</h5></label></br>'+'<button type="button" class="btn btn-default" id="product1_maturity" >合約期滿</button></div>'+'<div><input  id="product1_termainal_have_installed"type="text"placeholder="已完成期數"/>'+'<button type="button" class="btn btn-default" id="product1_terminal">提前解約</button></div>');
			 
	// let button have onclick function
	var addButton = document.getElementById("product1_maturity");
	addButton.onclick = product1_maturity_function;
			 

	// let button have onclick function
	var addButton = document.getElementById("product1_terminal");
	addButton.onclick = product1_terminal_function;
}


function newBank(web3, log, contractAddress) {
	var bankContract = web3.eth.contract(bankAbi);
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
		}
	});
	
	
}

function product1_maturity_function(){
		
	
		// generate product1_contract instance
		var Product1_Contract = web3.eth.contract(product1_abi);
		var Product1_Contract_Instance = Product1_Contract.at($('#product_address').text());

		// call product1 contract function
		Product1_Contract_Instance.maturity({
			from: eth.coinbase,
			gas:4600000
		});
		$('#whoamiButton').trigger('click');
		// clear <div id="put_pi">
		$("#put_p1").empty();
	}
	

function product1_terminal_function(){
		
		if(parseInt($("#product1_termainal_have_installed").val())>12 ||$("#product1_termainal_have_installed").val() == ""){
		   alert("請確認期數")
		}
		else{
			// generate product1_contract instance
			var Product1_Contract = web3.eth.contract(product1_abi);
			var Product1_Contract_Instance = Product1_Contract.at($('#product_address').text());




			// call product1 contract function
			Product1_Contract_Instance.terminal(parseInt($("#product1_termainal_have_installed").val()),{
				from: eth.coinbase,
				gas:4600000
			})

			$('#whoamiButton').trigger('click');
			$("#put_p1").empty();
		}
}

function test_number(input){
	if(input =="" || parseInt(input) == 0 ||input.indexOf("-") >= 0)
		return false;
	else
		return true
}