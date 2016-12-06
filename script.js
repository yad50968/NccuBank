var product1_abi = [{"constant":false,"inputs":[{"name":"have_installments","type":"uint256"}],"name":"terminal","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"maturity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_who_buy","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_installments","type":"uint256"},{"name":"_nccubank_address","type":"address"}],"payable":false,"type":"constructor"}]

var user1_product1_address;
var web3;


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
	var eth = web3.eth

	// simpleStorage 的 ABI
	var simplestorageAbi = [{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"},{"name":"have_installments","type":"uint256"}],"name":"product1_terminal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user2_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"product_1","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user2_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"}],"name":"product1_maturity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user1_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"}],"name":"create_product_1","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"user1","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"show_product1_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"user2","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nccubank_coin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user1_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_who_buy","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_installments","type":"uint256"},{"indexed":false,"name":"product1_address","type":"address"}],"name":"generate_product1_event","type":"event"}]
	// 以 eth.contract 參照 ABI 製造出合約正本
	var simplestorageContract = web3.eth.contract(simplestorageAbi)

	// 以合約正本 new 出一個新的合約個體
	// from 第一個帳戶
	// data 為編譯出來的 合約 bytecode
	var simplestorage = simplestorageContract.new({
		from: web3.eth.accounts[0],
		data: '60606040526298968060005573ca35b7d915458ef540ade6068dfe2f44e8fa733c600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507314723a09acff6d2a60dcdf7aa4aff308fddc160c600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550604060405190810160405280600881526020017f70726f647563743100000000000000000000000000000000000000000000000081526020015060059080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013257805160ff1916838001178555610160565b82800160010185558215610160579182015b8281111561015f578251825591602001919060010190610144565b5b50905061018591905b80821115610181576000816000905550600101610169565b5090565b505034610000575b620f424060016000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550620f424060016000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b610f82806102436000396000f3606060405236156100bd576000357c0100000000000000000000000000000000000000000000000000000000900480630b01686b146100c25780630b1646fb146100fa57806327e235e31461013357806336effa781461016457806341096a5c146101df5780636638f2441461020257806369776d731461023157806370defcbc1461026a578063ac1717b014610299578063b575f09a146102d2578063b9edb1af14610319578063c1d5aee414610352578063e563266014610375575b610000565b34610000576100f86004808035906020019091908035906020019091908035906020019091908035906020019091905050610398565b005b34610000576101076104d3565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761014e60048080359060200190919050506104fe565b6040518082815260200191505060405180910390f35b3461000057610171610516565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576101ec6105b4565b6040518082815260200191505060405180910390f35b346100005761022f6004808035906020019091908035906020019091908035906020019091905050610608565b005b346100005761023e610744565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610297600480803590602001909190803590602001909190803590602001909190505061076f565b005b34610000576102a6610aa4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102ed6004808035906020019091905050610aca565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610326610b8e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761035f610bb4565b6040518082815260200191505060405180910390f35b3461000057610382610bba565b6040518082815260200191505060405180910390f35b6000600260008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600560405180828054600181600116156101000203166002900480156104205780601f106103fe576101008083540402835291820191610420565b820191906000526020600020905b81548152906001019060200180831161040c575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508181830384028115610000570460006000828254039250508190555081818303840281156100005704600160008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b50505050565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60016020528060005260406000206000915090505481565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105ac5780601f10610581576101008083540402835291602001916105ac565b820191906000526020600020905b81548152906001019060200180831161058f57829003601f168201915b505050505081565b600060016000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90565b6000600260008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600560405180828054600181600116156101000203166002900480156106905780601f1061066e576101008083540402835291820191610690565b820191906000526020600020905b81548152906001019060200180831161067c575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555060648183028115610000570482016000600082825403925050819055506064818302811561000057048201600160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b600082600160008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156107a757610000565b82600160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550826000600082825401925050819055508383833060405161037480610c0e833901808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f080156100005790508073ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150600260008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005604051808280546001816001161561010002031660029004801561095c5780601f1061093a57610100808354040283529182019161095c565b820191906000526020600020905b815481529060010190602001808311610948575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507f3ba82705b0cffd42275544c97398d93a0aa52e3503feee18fc5df5085909c3c68484848473ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390a15b50505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060056040518082805460018160011615610100020316600290048015610b525780601f10610b30576101008083540402835291820191610b52565b820191906000526020600020905b815481529060010190602001808311610b3e575b5050915050908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b600060016000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b905660606040523461000057604051608080610374833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555082600281905550816003819055505b505050505b610297806100dd6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631be1894c1461004e578063204f83f91461006b578063f6b4dfb41461007a575b610000565b346100005761006960048080359060200190919050506100b3565b005b34610000576100786101a5565b005b346100005761008761028e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16630b01686b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660025460035486604051857c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001828152602001945050505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b5050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16636638f244600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254600354604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b50565b60003090505b9056',
		gas: 4700000
	}, function(e, contract) {
		// 因為此 callback 會被呼叫兩次，所以要判斷 contract.address 是否為存在，存在表示已經部署成功
		if (typeof contract.address !== 'undefined') {
			log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash)

			// 載入我們設計的介面接合
			contractControl(simplestorage, eth)
		}
	})

})

// 這裡將控制 simplestorage 與 網頁介面的接合，無論是事件處理還是輸入互動
function contractControl(simplestorage, eth) {
	


	// 監看 generate product1 event
	simplestorage.generate_product1_event().watch(function(error, result){
		
		user1_product1_address = result.args["product1_address"];
		log("接收到 product1 產生 Event \n" + JSON.stringify(result.args));
	});
	
	//按 show user1 address
	$('#show_user1_address_button').on('click', function() {
		var user1_address = simplestorage.show_user1_address();
		log('user1_address is : ' + user1_address)
	})
	
	//按 show user1 nccucoin
	$('#show_user1_nccucoin_button').on('click', function() {
		var user1_address = simplestorage.show_user1_balance();
		log('user1_nccucoin is : ' + user1_address)
	})
	
	//按 show user2 address
	$('#show_user2_address_button').on('click', function() {
		var user1_address = simplestorage.show_user2_address();
		log('user2_address is : ' + user1_address)
	})
	
	//按 show user2 nccucoin
	$('#show_user2_nccucoin_button').on('click', function() {
		var user1_address = simplestorage.show_user2_balance();
		log('user2_nccucoin is : ' + user1_address)
	})

	// 顯示 user product1 address
	$('#show_user_product1_address_button').on('click', function() {
		var address = simplestorage.show_product1_address($('#user_address_for_show_product1').val());
		log('user_product1_address is : ' + address)
		
		
	})
	
	// 按產生product1
	$('#generate_product1_button').on('click', function() {
		
		
		 var txHash = simplestorage.create_product_1($('#user_address').val(),parseInt($('#amount').val()),parseInt($('#installment').val()),{
			 from: eth.coinbase,
			 gas: 4600000
		 })
		 
		 if($("#put_p1").val() === ""){

			 // append product1 button
			 $("#put_p1").append('<button id="product1_maturity" >product1 maturity</button></div>'+'<div><input  id="product1_termainal_have_installed"type="text"placeholder="have_installed"/>'+'<button id="product1_terminal">product1 terminal</button></div>');
			 
			 // let button have onclick function
			 var addButton = document.getElementById("product1_maturity");
			 addButton.onclick = product1_maturity_function;
			 

			 // let button have onclick function
			 var addButton = document.getElementById("product1_terminal");
			 addButton.onclick = product1_terminal_function;
		 }
		 log('txHash is : ' + txHash)
	})


	function product1_maturity_function(){
		
		// generate product1_contract instance
		var Product1_Contract = web3.eth.contract(product1_abi);
		var Product1_Contract_Instance = Product1_Contract.at(user1_product1_address);

		// call product1 contract function
		Product1_Contract_Instance.maturity({
			from: eth.coinbase,
			gas:4600000
		});


		// clear <div id="put_pi">
		$("#put_p1").empty();
	}
	

	function product1_terminal_function(){
		
		// generate product1_contract instance
		var Product1_Contract = web3.eth.contract(product1_abi);
		var Product1_Contract_Instance = Product1_Contract.at(user1_product1_address);


		
		
		// call product1 contract function
		Product1_Contract_Instance.terminal(parseInt($("#product1_termainal_have_installed").val()),{
			from: eth.coinbase,
			gas:4600000
		})

		// clear <div id="put_pi">
		$("#put_p1").empty();
	}
	
	
}