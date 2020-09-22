function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
	const stackNumbers = [];
    const stackOperations = [];

    const priorityOperations = {
    	'-' : 1,
    	'+' : 1,
    	'*' : 2,
    	"/" : 2, 
    }

    let arr = devideStr(expr);


    //check if open and close brackets are equal quantity
    let openBrackets = 0;
    let closeBrackets = 0;
    for (let i = 0; i < arr.length; i++) {
    	if (arr[i] == '(') openBrackets++;
    	if (arr[i] == ')') closeBrackets++;
    }
    if ( (openBrackets != closeBrackets) && (openBrackets != 0 || closeBrackets != 0) ) throw ("ExpressionError: Brackets must be paired");
    

    
    //go throw every number and operation
    for (let i = 0; i < arr.length; i++) {
    	if (!isNaN(arr[i]))  {
    		stackNumbers.push(Number(arr[i]));
    		continue;
    	}

    	if (arr[i] == '(') {
    		stackOperations.push(arr[i]);
    		continue;
    	}

    	if (arr[i] == ')') {
    		while (stackOperations[stackOperations.length - 1] != '(') {
		    	let SecondNum = stackNumbers.pop();
		    	let firstNum = stackNumbers.pop();
		 		let operat = stackOperations.pop();

		  		countFunc(firstNum, operat, SecondNum);
  			
		    }
		    stackOperations.pop();
		    continue;
    	}

    	//if stack of operations is empty
    	if (stackOperations[0] == undefined) {	
    		stackOperations.push(arr[i]);	
    		continue;
    	}


    	let lastElemOperStack = stackOperations[stackOperations.length - 1];
 		let lastOperStackPriority = priorityOperations[lastElemOperStack];

 		let currentElement = arr[i];
 		let currentElementPriority = priorityOperations[currentElement];
 		
 		if (currentElementPriority > lastOperStackPriority) {
 			stackOperations.push(arr[i]);	
    		continue;	
 		}

    	while (lastOperStackPriority >= currentElementPriority) {
    		let SecondNum = stackNumbers.pop();
  			let firstNum = stackNumbers.pop();
  			let operat = stackOperations.pop();

  			countFunc(firstNum, operat, SecondNum);

    		lastElemOperStack = stackOperations[stackOperations.length - 1];
 			lastOperStackPriority = priorityOperations[lastElemOperStack];
    	}
    	stackOperations.push(arr[i]);

    }

    while (stackOperations[0] != undefined) {
    	let SecondNum = stackNumbers.pop();
    	let firstNum = stackNumbers.pop();
 		let operat = stackOperations.pop();

  		countFunc(firstNum, operat, SecondNum);
    }

	return stackNumbers[0];







	function devideStr(arr) {
		const re = /([\-+/*)(])/;
	    arr = arr.split(re);

	    for (i in arr) {
	    	arr[i] = arr[i].trim();
	    	if ( (arr[i] == '') || ( arr[i] == ' ') ) {
	    		arr.splice(i, 1);
	    	}
	    }

	    return arr;
	}


	function countFunc(firstNum, operat, SecondNum) {
		switch (operat) {
	  		case "+" : 
	  			stackNumbers.push(firstNum + SecondNum);
	  			break;
	  		case "-" : 
	  			stackNumbers.push(firstNum - SecondNum);
	  			break;
	  		case "*" : 
	  			stackNumbers.push(firstNum * SecondNum);
	  			break;
	  		case "/" :
	  			if (SecondNum == 0) throw("TypeError: Division by zero."); 
	  			stackNumbers.push(firstNum / SecondNum);
	  			break;
	  	}
	}
}


module.exports = {
    expressionCalculator
}