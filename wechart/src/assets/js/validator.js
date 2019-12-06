import WxValidate from './WxValidate.js'

export default class Validator {
    constructor(rule = {}){
        this.rule = rule;
        this.messages = {};
        this.validateRuler = null;
        this.ruleList = ['email','tel','date','dateISO','number','digits','idcard','equalTo','contains','minlength','naxlength','rangelength','min','max','range']
        this.__init();
    }

    __init(){
        let {rule ,messages ,ruleList} = this; 
        for(var item in rule){
            messages[item] = {};
            if(rule[item].required){
                messages[item].required = rule[item].messages || `${rule[item].filed}不能为空`;
            }
            if(rule[item].type && ruleList.indexOf(rule[item].type) != -1){
                rule[item][rule[item].type] = true;
                if(rule[item].type == 'array'){

                }else{
                    messages[rule[item].type] = rule[item].messages || `${rule[item].filed}不能为空`;
                }
            }
            if(rule[item].validator){
                rule[item][item] = true;
            }
        }
        this.validateRuler = new WxValidate(rule,messages);
        for(var item in rule){  //自定义验证
            if(rule[item].validator){
                this.validateRuler.addMethod(item, rule[item].validator.valFun , rule[item].validator.errMsg)
            }
        }
        return this.validateRuler;
    }
    checkForm(formData){
        return new Promise( (resolve, reject) =>  {
            if(this.validateRuler.checkForm(formData)){
                resolve(this.validateRuler.checkForm(formData))
            }else{
                reject(this.validateRuler.errorList)
            }
        })
    }
}