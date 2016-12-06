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
	var simplestorageAbi = [{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"},{"name":"have_installments","type":"uint256"}],"name":"product1_terminal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user2_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"product_1","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user2_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"}],"name":"product1_maturity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user1_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"whobuy","type":"address"},{"name":"amount","type":"uint256"},{"name":"installments","type":"uint256"}],"name":"create_product_1","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"user1","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"show_product1_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"user2","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nccubank_coin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"show_user1_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_who_buy","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_installments","type":"uint256"},{"indexed":false,"name":"product1_address","type":"address"}],"name":"generate_product1_event","type":"event"}];
	// 以 eth.contract 參照 ABI 製造出合約正本
	var simplestorageContract = web3.eth.contract(simplestorageAbi)

	// 以合約正本 new 出一個新的合約個體
	// from 第一個帳戶
	// data 為編譯出來的 合約 bytecode
	var simplestorage = simplestorageContract.new({
		from: web3.eth.accounts[0],
		data: '60606040526298968060015573ca35b7d915458ef540ade6068dfe2f44e8fa733c600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507314723a09acff6d2a60dcdf7aa4aff308fddc160c600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550604060405190810160405280600881526020017f70726f647563743100000000000000000000000000000000000000000000000081526020015060069080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013257805160ff1916838001178555610160565b82800160010185558215610160579182015b8281111561015f578251825591602001919060010190610144565b5b50905061018591905b80821115610181576000816000905550600101610169565b5090565b505034610000575b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550620f424060026000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550620f424060026000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b610fe4806102806000396000f3606060405236156100c8576000357c01000000000000000000000000000000000000000000000000000000009004806307546172146100cd5780630b01686b146101065780630b1646fb1461013e57806327e235e31461017757806336effa78146101a857806341096a5c146102235780636638f2441461024657806369776d731461027557806370defcbc146102ae578063ac1717b0146102dd578063b575f09a14610316578063b9edb1af1461035d578063c1d5aee414610396578063e5632660146103b9575b610000565b34610000576100da6103dc565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761013c6004808035906020019091908035906020019091908035906020019091908035906020019091905050610402565b005b346100005761014b61053d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101926004808035906020019091905050610568565b6040518082815260200191505060405180910390f35b34610000576101b5610580565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102155780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346100005761023061061e565b6040518082815260200191505060405180910390f35b34610000576102736004808035906020019091908035906020019091908035906020019091905050610672565b005b34610000576102826107ae565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102db60048080359060200190919080359060200190919080359060200190919050506107d9565b005b34610000576102ea610b0e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103316004808035906020019091905050610b34565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761036a610bf8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103a3610c1e565b6040518082815260200191505060405180910390f35b34610000576103c6610c24565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206006604051808280546001816001161561010002031660029004801561048a5780601f1061046857610100808354040283529182019161048a565b820191906000526020600020905b815481529060010190602001808311610476575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508181830384028115610000570460016000828254039250508190555081818303840281156100005704600260008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b50505050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60026020528060005260406000206000915090505481565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106165780601f106105eb57610100808354040283529160200191610616565b820191906000526020600020905b8154815290600101906020018083116105f957829003601f168201915b505050505081565b600060026000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90565b6000600360008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600660405180828054600181600116156101000203166002900480156106fa5780601f106106d85761010080835404028352918201916106fa565b820191906000526020600020905b8154815290600101906020018083116106e6575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555060648183028115610000570482016001600082825403925050819055506064818302811561000057048201600260008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b505050565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b600082600260008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561081157610000565b82600260008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550826001600082825401925050819055508383833060405161036c80610c78833901808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f080156100005790508073ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150600360008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600660405180828054600181600116156101000203166002900480156109c65780601f106109a45761010080835404028352918201916109c6565b820191906000526020600020905b8154815290600101906020018083116109b2575b5050915050908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507f3ba82705b0cffd42275544c97398d93a0aa52e3503feee18fc5df5085909c3c68484848473ffffffffffffffffffffffffffffffffffffffff1663f6b4dfb4600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390a15b50505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060066040518082805460018160011615610100020316600290048015610bbc5780601f10610b9a576101008083540402835291820191610bbc565b820191906000526020600020905b815481529060010190602001808311610ba8575b5050915050908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b600060026000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90566060604052346100005760405160808061036c833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555082600281905550816003819055505b505050505b61028f806100dd6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631be1894c1461004e578063204f83f91461006b578063f6b4dfb41461007a575b610000565b346100005761006960048080359060200190919050506100b3565b005b346100005761007861019d565b005b3461000057610087610286565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16636638f244600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254600354604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b5050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16636638f244600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254600354604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b156100005760325a03f115610000575050506000ff5b50565b60003090505b9056',
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
		user1_product1_address = result["product1_address"];
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
		Product1_Contract_Instance.terminal(parseInt($("#product1_termainal_have_installed").val()))({
			from: eth.coinbase,
			gas:4600000
		})


		// clear <div id="put_pi">
		$("#put_p1").empty();
	}
	
	
}