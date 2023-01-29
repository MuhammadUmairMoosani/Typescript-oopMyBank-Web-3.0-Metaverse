#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

class Customer {
    FirstName : string;
    LastName : string;
    Gender : string;
    Age : number;
    MobileNumber : string;
    BankAccount: string;

    constructor(FirstName : string, LastName : string, Gender: string, Age: number,MobileNumber:string ,BankAccount: string) {
        this.FirstName = FirstName;
            this.LastName = LastName;
            this.Gender  = Gender;
            this.Age  = Age;
            this.MobileNumber  = MobileNumber;
            this.BankAccount = BankAccount;
    }
    customerInfo() {
        return `Name: ${this.FirstName} ${this.LastName}`
    }
}

interface IBankAccount {
    Debit:(amount:number) => string;
    Credit:(amount:number) => string;
    BankBalance: () => number;
}

class BankAccount implements IBankAccount {
    AccountBalance: number = 100;

    constructor(AccountBalance: number) {
        this.AccountBalance = AccountBalance;
    }

    Debit = (amount:number): string => {
    let statement = "Sorry, you have insufficient balance!";
        if(amount > 0) {
            statement = "Your account has been debited successfully!";
            if(this.AccountBalance > amount) {
                this.AccountBalance = this.AccountBalance - amount;
            }
            else {
                statement = "You don't have enough to do this transaction";
            }
        }
        return statement;
    };
    Credit = (amount: number):string => {
        let statement = "Transaction failed!";
        if(amount > 0) {
            this.AccountBalance = Number(this.AccountBalance) + Number(amount);
            if(amount > 100) {
                this.AccountBalance = this.AccountBalance -1;
            }
            statement = "Your account has been credited successfully!";
        }
        return statement
    };
    BankBalance = (): number => {
        return this.AccountBalance;
    }
}

let customer: Customer;
let bankAccount: BankAccount;
const handleCreateCustomerAccount = (firstName: string, lastName: string, gender: string, age: number, mobileNumber: string, accountNumber: string,accountBalance:number) => {
    customer = new Customer(firstName,lastName,gender,age,mobileNumber,accountNumber);
    bankAccount = new BankAccount(accountBalance);
    banking();
}

const handleCustomerInformation = () => {
    if(customer) {
        console.log( customer.customerInfo());
    } else {
        console.log(chalk.red("No data found!"))
    }
    banking();
}

const handleDebit = (amount: number) => {
    if(bankAccount) {
        console.log(bankAccount.Debit(amount));
    } else {
        console.log(chalk.red("No data found!"))
    }
    banking();
}

const handleCredit = (amount: number) => {
    if(bankAccount) {
        console.log(bankAccount.Credit(amount));
    } else {
        console.log(chalk.red("No data found!"))
    }
    banking();
}

const handleGetBankBalance = () => {
    if(bankAccount) {
        console.log(chalk.yellow(bankAccount.BankBalance()));
    } else {
        console.log(chalk.red("No data found!"))
    }
    banking();
}



const banking = async () => {

    const bank = await inquirer.prompt([
        {
            type:"list",
            name:"selectedOption",
            message:"Please selection option",
            choices:["Create Customer account","Show Customer Information","Debit","Credit","Show Bank Balance"]
        },
        {
            type:"string",
            name:"firstName",
            message:"Please enter first name",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"string",
            name:"lastName",
            message:"Please enter last name",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"string",
            name:"gender",
            message:"Please enter gender",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"number",
            name:"age",
            message:"Please enter age",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"string",
            name:"mobileNumber",
            message:"Please enter mobile number",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"string",
            name:"accountNumber",
            message:"Please enter account number",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"string",
            name:"accountBalance",
            message:"Please enter account balance",
            when(answer) {
                return  answer.selectedOption === "Create Customer account"
            }
        },
        {
            type:"number",
            name:"amount",
            message:"Please enter amount",
            when(answer) {
                return answer.selectedOption === "Debit" || answer.selectedOption === "Credit"
            }
        }
    ])
    
    const { selectedOption, firstName, lastName, gender, age, mobileNumber, accountNumber,accountBalance,amount } = bank;
    
    switch(selectedOption) {
        case "Create Customer account":
            handleCreateCustomerAccount(firstName, lastName, gender, age, mobileNumber, accountNumber,accountBalance);
        break;
        case "Show Customer Information":
            handleCustomerInformation()
        break;
        case "Debit":
            handleDebit(amount);
        break;
        case "Credit":
            handleCredit(amount);
        break;
        case "Show Bank Balance":
            handleGetBankBalance();
        break;
    }
}


banking();