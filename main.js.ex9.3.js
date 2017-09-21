class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.userGears = ['P', 'N', 'R', 'D']; // 사용할 수 있는 기어 목록
        this.userGear = this.userGears[0]; // 현재 기어
    }
    shift(gear) {
        if(this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear: ${gear}`);
        this.userGear = gear;
    }
}

class InsurancePolicy {}
const ADD_POLITY = Symbol();
const GET_POLITY = Symbol();
const IS_INSURED = Symbol();
const _POLITY = Symbol();
function makeInsurable(o) {
    o[ADD_POLITY] = function(p) { this[_POLITY] = p };
    o[GET_POLITY] = function() { return this[_POLITY]; }
    o[IS_INSURED] = function() { return !!this[_POLITY]; }
}

/*
const car1 = new Car();
makeInsurable(car1); // Car 객체 마다 호출 해야한다.
car1.addInsurancePolicy(new InsurancePolicy());
*/
/*
makeInsurable(Car.prototype); // 보험관련 메소드가 Car 클래스에 정의된 것처럼 동작
const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy());
*/

