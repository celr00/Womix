"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[845],{5845:(_,m,i)=>{i.r(m),i.d(m,{LandingModule:()=>j});var C=i(6895),s=i(2559),o=i(433),L=i(4986),F=i(4482),k=i(5403),w=i(5698),I=i(3900),P=i(4004),M=i(8746),t=i(1571),c=i(7185),g=i(5329),p=i(4015),D=i(4897);let Q=(()=>{class r{constructor(n,e,l,d){this.fb=n,this.toastr=e,this.router=l,this.accountService=d,this.errors=null,this.maxDate=new Date,this.registerForm=new o.cw({}),this.complexPassword="(?=^.{6,255}$)((?=.*d)(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"}ngOnInit(){this.initializeForm(),this.maxDate.setFullYear(this.maxDate.getFullYear()-18)}initializeForm(){this.registerForm=this.fb.group({firstName:["",[o.kI.required,o.kI.minLength(1),o.kI.maxLength(60)]],lastName:["",[o.kI.required,o.kI.minLength(1),o.kI.maxLength(60)]],email:["",[o.kI.required,o.kI.email],[this.validateEmailNotTaken()]],password:["",[o.kI.required,o.kI.minLength(8),o.kI.maxLength(60),o.kI.pattern(this.complexPassword)]],confirmPassword:["",[o.kI.required,o.kI.minLength(8),o.kI.maxLength(60),this.matchValues("password")]],phoneNumber:["",[o.kI.required,o.kI.minLength(8),o.kI.maxLength(10)]],dateOfBirth:["",[o.kI.required]],facebook:["",[o.kI.required,o.kI.minLength(5),o.kI.maxLength(60)]],instagram:["",[o.kI.required,o.kI.minLength(5),o.kI.maxLength(60)]]}),this.registerForm.controls.password.valueChanges.subscribe({next:()=>this.registerForm.controls.confirmPassword.updateValueAndValidity()})}matchValues(n){return e=>e.value===e.parent?.get(n)?.value?null:{notMatching:!0}}onSubmit(){const n=this.getDateOnly(this.registerForm.controls.dateOfBirth.value),e={...this.registerForm.value,dateOfBirth:n};console.log(e),this.accountService.register(e).subscribe({next:()=>{this.router.navigateByUrl("/")},error:l=>{}})}getDateOnly(n){if(!n)return;let e=new Date(n);return new Date(e.setMinutes(e.getMinutes()-e.getTimezoneOffset())).toISOString().slice(0,10)}validateEmailNotTaken(){return n=>n.valueChanges.pipe(function J(r,a=L.z){return(0,F.e)((n,e)=>{let l=null,d=null,q=null;const A=()=>{if(l){l.unsubscribe(),l=null;const u=d;d=null,e.next(u)}};function N(){const u=q+r,U=a.now();if(U<u)return l=this.schedule(void 0,u-U),void e.add(l);A()}n.subscribe((0,k.x)(e,u=>{d=u,q=a.now(),l||(l=a.schedule(N,r),e.add(l))},()=>{A(),e.complete()},void 0,()=>{d=l=null}))})}(1e3),(0,w.q)(1),(0,I.w)(()=>this.accountService.checkEmailExists(n.value).pipe((0,P.U)(e=>e?{emailExists:!0}:null),(0,M.x)(()=>n.markAsTouched()))))}}return r.\u0275fac=function(n){return new(n||r)(t.Y36(o.qu),t.Y36(c._W),t.Y36(s.F0),t.Y36(g.B))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-register"]],decls:35,vars:24,consts:[[1,"container"],[1,"mb-5",3,"formGroup","ngSubmit"],[1,"card","shadow-sm","border-0"],[1,"card-header","p-3","bg-white"],[1,"card-body"],[1,"d-flex","row","mb-5"],[1,"col-12","col-sm-6","col-md-5","col-lg-4","col-xl-3"],[3,"formControl","label"],[1,"col-12","col-sm-6","col-md-5","col-lg-4","col-xl-4"],[3,"formControl","label","type"],[1,"col-12","col-sm-6","col-md-4","col-lg-3","col-xl-2"],[3,"formControl","label","maxDate"],[1,"row","d-flex"],[1,"col-12","col-sm-8","col-md-6","col-lg-4"],[1,"row","d-flex","mb-5"],[1,"col-12","col-sm-6","col-md-4","col-lg-3"],[1,"card-footer","p-3","bg-white"],["routerLink","/",1,"btn","btn-lg","btn-outline-secondary","me-3"],["type","submit",1,"btn","btn-lg","btn-primary",3,"disabled"],["routerLink","/sign-in",1,"text-decoration-none"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"form",1),t.NdJ("ngSubmit",function(){return e.onSubmit()}),t.TgZ(2,"div",2)(3,"h5",3),t._uU(4," Crea tu perfil "),t.qZA(),t.TgZ(5,"div",4)(6,"div",5)(7,"div",6),t._UZ(8,"app-text-input",7),t.qZA(),t.TgZ(9,"div",6),t._UZ(10,"app-text-input",7),t.qZA(),t.TgZ(11,"div",8),t._UZ(12,"app-text-input",9),t.qZA(),t.TgZ(13,"div",10),t._UZ(14,"app-date-picker",11),t.qZA()(),t.TgZ(15,"div",12)(16,"div",13),t._UZ(17,"app-text-input",9),t.qZA()(),t.TgZ(18,"div",14)(19,"div",13),t._UZ(20,"app-text-input",9),t.qZA()(),t.TgZ(21,"div",12)(22,"div",15),t._UZ(23,"app-text-input",7),t.qZA(),t.TgZ(24,"div",15),t._UZ(25,"app-text-input",7),t.qZA(),t.TgZ(26,"div",15),t._UZ(27,"app-text-input",7),t.qZA()()(),t.TgZ(28,"div",16)(29,"a",17),t._uU(30,"Cancelar"),t.qZA(),t.TgZ(31,"button",18),t._uU(32,"Crear cuenta"),t.qZA()()()(),t.TgZ(33,"a",19),t._uU(34,"Ya tengo cuenta"),t.qZA()()),2&n&&(t.xp6(1),t.Q6J("formGroup",e.registerForm),t.xp6(7),t.Q6J("formControl",e.registerForm.controls.firstName)("label","Nombre"),t.xp6(2),t.Q6J("formControl",e.registerForm.controls.lastName)("label","Apellido"),t.xp6(2),t.Q6J("formControl",e.registerForm.controls.email)("label","Correo")("type","email"),t.xp6(2),t.Q6J("formControl",e.registerForm.controls.dateOfBirth)("label","Fecha de nacimiento")("maxDate",e.maxDate),t.xp6(3),t.Q6J("formControl",e.registerForm.controls.password)("label","Contrase\xf1a")("type","password"),t.xp6(3),t.Q6J("formControl",e.registerForm.controls.confirmPassword)("label","Repetir contrase\xf1a")("type","password"),t.xp6(3),t.Q6J("formControl",e.registerForm.controls.phoneNumber)("label","Tel\xe9fono"),t.xp6(2),t.Q6J("formControl",e.registerForm.controls.facebook)("label","Facebook"),t.xp6(2),t.Q6J("formControl",e.registerForm.controls.instagram)("label","Instagram"),t.xp6(4),t.Q6J("disabled",e.registerForm.invalid))},dependencies:[s.rH,p.t,D.L,o._Y,o.JJ,o.JL,o.oH,o.sg]}),r})(),S=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-footer"]],decls:14,vars:0,consts:[[2,"background-color","#d3d4d9 !important"],[1,"container-fluid","container-xxl","p-3"],[1,"d-flex","justify-content-evenly","align-items-center"],["src","../../../assets/Womix Nav Logo.svg","alt","",2,"max-width","100px"],["routerLink","/",1,"text-decoration-none","text-muted"]],template:function(n,e){1&n&&(t.TgZ(0,"footer",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.TgZ(4,"span"),t._uU(5,"\xa9 2023 Copyright"),t.qZA(),t.TgZ(6,"a",4),t._uU(7," Pol\xedtica de Privacidad "),t.qZA(),t.TgZ(8,"a",4),t._uU(9," Condiciones de Uso "),t.qZA(),t.TgZ(10,"a",4),t._uU(11," Pol\xedtica de Cookies "),t.qZA(),t.TgZ(12,"a",4),t._uU(13," Pol\xedtica de copyright "),t.qZA()()()())},dependencies:[s.rH]}),r})();const v=function(){return{category:"1"}},f=function(){return{category:"2"}},Z=function(){return{category:"3"}},b=function(){return{category:"4"}},h=function(){return{category:"5"}},y=function(){return{category:"6"}},x=function(){return{category:"7"}},T=function(){return{category:"8"}},B=[{path:"",component:(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-landing"]],decls:142,vars:32,consts:[[1,"my-5","p-4","shadow-info","bg-info-light"],[1,"container-fluid","container-xl"],[1,"row","align-items-center","py-3"],[1,"col-12","col-lg-6"],[1,"text-info","mb-5","text-center"],[1,"row","mb-3"],[1,"col"],[1,"btn","btn-outline-info","py-3","btn-lg","rounded-pill","border","border-3","border-info","col-12"],[1,"col-3"],[1,"col-5"],[1,"btn","btn-outline-info","py-3","px-5","btn-lg","rounded-pill","border","border-3","border-info"],[1,"row"],[1,"col","d-flex","justify-content-center"],["src","../../assets/landing/first.png","alt","",1,"img-fluid","col-8"],["routerLink","/jobs",1,"btn","btn-lg","px-5","py-3","btn-info","fs-3","rounded-4"],[1,"my-5","p-4","shadow-warning","bg-primary-light"],["src","../../assets/landing/second.png","alt","",1,"img-fluid"],["routerLink","/products",1,"btn","btn-lg","px-5","py-3","btn-primary","fs-3","rounded-4"],[1,"text-primary","mb-5","text-center"],["routerLink","/products",1,"btn","btn-outline-primary","py-3","btn-lg","rounded-pill","border","border-3","border-primary","col-12",3,"queryParams"],[1,"col-4"],["routerLink","/services",1,"btn","btn-outline-info","py-3","btn-lg","rounded-pill","border","border-3","border-info","col-12",3,"queryParams"],["src","../../assets/landing/third.png","alt","",1,"img-fluid","col-8"],["routerLink","/services",1,"btn","btn-lg","px-5","py-3","btn-info","fs-3","rounded-4"],[1,"my-5"],[1,"container-fluid"],[1,"col-12","col-lg-6","bg-primary-light","shadow-warning","py-5"],[1,"container-fluid","container-xxl"],[1,"text-primary","text-center","mb-5"],[1,"col-12","d-flex","justify-content-center"],["routerLink","/",1,"btn","btn-lg","btn-primary","fs-2","p-4"],[1,"col-12","col-lg-6","bg-info-light","shadow-info","py-5"],[1,"container-fluid","container-xxl","my-auto"],[1,"text-info","text-center","mb-5"],[1,"col-12","d-flex","my-auto","justify-content-center"],["routerLink","/",1,"btn","btn-lg","btn-info","fs-2","p-4"]],template:function(n,e){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),t._uU(5,"Find your dream job"),t.qZA(),t.TgZ(6,"div",5)(7,"div",6)(8,"button",7),t._uU(9,"Engineering"),t.qZA()(),t.TgZ(10,"div",8)(11,"button",7),t._uU(12,"Finance"),t.qZA()(),t.TgZ(13,"div",6)(14,"button",7),t._uU(15,"Marketing"),t.qZA()()(),t.TgZ(16,"div",5)(17,"div",6)(18,"button",7),t._uU(19,"Customer Support"),t.qZA()(),t.TgZ(20,"div",6)(21,"button",7),t._uU(22,"Human Resources"),t.qZA()()(),t.TgZ(23,"div",5)(24,"div",9)(25,"button",7),t._uU(26,"Sales Manager"),t.qZA()(),t.TgZ(27,"div",6)(28,"button",7),t._uU(29,"Project Manager"),t.qZA()()(),t.TgZ(30,"button",10),t._uU(31,"Administrative Assistant"),t.qZA()(),t.TgZ(32,"div",3)(33,"div",11)(34,"div",12),t._UZ(35,"img",13),t.qZA()(),t.TgZ(36,"div",11)(37,"div",12)(38,"a",14),t._uU(39,"Seek for job"),t.qZA()()()()()()(),t.TgZ(40,"section",15)(41,"div",1)(42,"div",2)(43,"div",3)(44,"div",11)(45,"div",12),t._UZ(46,"img",16),t.qZA()(),t.TgZ(47,"div",11)(48,"div",12)(49,"a",17),t._uU(50,"Seek for products"),t.qZA()()()(),t.TgZ(51,"div",3)(52,"h1",18),t._uU(53,"You will only find quality"),t.qZA(),t.TgZ(54,"div",5)(55,"div",6)(56,"a",19),t._uU(57,"Clothing & Accesories"),t.qZA()(),t.TgZ(58,"div",20)(59,"a",19),t._uU(60,"Travel"),t.qZA()()(),t.TgZ(61,"div",5)(62,"div",6)(63,"a",19),t._uU(64,"Home & Garden"),t.qZA()(),t.TgZ(65,"div",6)(66,"a",19),t._uU(67,"Food & Beverages"),t.qZA()()(),t.TgZ(68,"div",5)(69,"div",6)(70,"a",19),t._uU(71,"Health & Beauty"),t.qZA()(),t.TgZ(72,"div",9)(73,"a",19),t._uU(74,"Sports & Outdoors"),t.qZA()()(),t.TgZ(75,"div",5)(76,"div",20)(77,"a",19),t._uU(78,"Electronics"),t.qZA()(),t.TgZ(79,"div",6)(80,"a",19),t._uU(81,"Toys & Entertainment"),t.qZA()()()()()()(),t.TgZ(82,"section",0)(83,"div",1)(84,"div",2)(85,"div",3)(86,"h1",4),t._uU(87,"Make the best deals with the best kind of people"),t.qZA(),t.TgZ(88,"div",5)(89,"div",20)(90,"a",21),t._uU(91,"Cleaning"),t.qZA()(),t.TgZ(92,"div",6)(93,"a",21),t._uU(94,"Event Planning & Coordinator"),t.qZA()()(),t.TgZ(95,"div",5)(96,"div",6)(97,"a",21),t._uU(98,"Cooking & Meal Preparation"),t.qZA()(),t.TgZ(99,"div",20)(100,"a",21),t._uU(101,"Babysitting"),t.qZA()()(),t.TgZ(102,"div",5)(103,"div",6)(104,"a",21),t._uU(105,"Home Improvement"),t.qZA()(),t.TgZ(106,"div",6)(107,"a",21),t._uU(108,"Errand & Concierge"),t.qZA()()(),t.TgZ(109,"div",5)(110,"div",8)(111,"a",21),t._uU(112,"Pet Care"),t.qZA()(),t.TgZ(113,"div",20)(114,"a",21),t._uU(115,"Health & Fitness"),t.qZA()()()(),t.TgZ(116,"div",3)(117,"div",11)(118,"div",12),t._UZ(119,"img",22),t.qZA()(),t.TgZ(120,"div",11)(121,"div",12)(122,"a",23),t._uU(123,"Seek for services"),t.qZA()()()()()()(),t.TgZ(124,"section",24)(125,"div",25)(126,"div",11)(127,"div",26)(128,"div",27)(129,"h1",28),t._uU(130,"Post your job offers to find the right person"),t.qZA(),t.TgZ(131,"div",29)(132,"a",30),t._uU(133,"Start offering opportunities"),t.qZA()()()(),t.TgZ(134,"div",31)(135,"div",32)(136,"h1",33),t._uU(137,"Promote products or services"),t.qZA(),t.TgZ(138,"div",34)(139,"a",35),t._uU(140,"Start promoting quality"),t.qZA()()()()()()(),t._UZ(141,"app-footer")),2&n&&(t.xp6(56),t.Q6J("queryParams",t.DdM(16,v)),t.xp6(3),t.Q6J("queryParams",t.DdM(17,f)),t.xp6(4),t.Q6J("queryParams",t.DdM(18,Z)),t.xp6(3),t.Q6J("queryParams",t.DdM(19,b)),t.xp6(4),t.Q6J("queryParams",t.DdM(20,h)),t.xp6(3),t.Q6J("queryParams",t.DdM(21,y)),t.xp6(4),t.Q6J("queryParams",t.DdM(22,x)),t.xp6(3),t.Q6J("queryParams",t.DdM(23,T)),t.xp6(10),t.Q6J("queryParams",t.DdM(24,v)),t.xp6(3),t.Q6J("queryParams",t.DdM(25,f)),t.xp6(4),t.Q6J("queryParams",t.DdM(26,Z)),t.xp6(3),t.Q6J("queryParams",t.DdM(27,b)),t.xp6(4),t.Q6J("queryParams",t.DdM(28,h)),t.xp6(3),t.Q6J("queryParams",t.DdM(29,y)),t.xp6(4),t.Q6J("queryParams",t.DdM(30,x)),t.xp6(3),t.Q6J("queryParams",t.DdM(31,T)))},dependencies:[s.rH,S]}),r})()},{path:"sign-up",component:Q},{path:"sign-in",component:(()=>{class r{constructor(n,e,l,d){this.fb=n,this.toastr=e,this.accountService=l,this.router=d,this.loginForm=this.fb.group({email:["",[o.kI.required,o.kI.email]],password:["",[o.kI.required]]})}onSubmit(){this.accountService.login(this.loginForm.value).subscribe({next:()=>{this.router.navigateByUrl("/account/summary")},error:n=>{console.log(n)}})}}return r.\u0275fac=function(n){return new(n||r)(t.Y36(o.qu),t.Y36(c._W),t.Y36(g.B),t.Y36(s.F0))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-login"]],decls:14,vars:8,consts:[[2,"margin-top","80px",3,"formGroup","ngSubmit"],[1,"container-fluid","container-md"],[1,"row","d-flex","justify-content-center"],[1,"col-8","col-sm-6","col-md-3"],[1,"bg-white","rounded-3","shadow-sm","p-3"],[3,"formControl","label","type"],[1,"d-grid","gap-3","mb-4"],["routerLink","/",1,"btn","btn-lg","btn-outline-secondary"],["type","submit",1,"btn","btn-lg","btn-primary",3,"disabled"],["routerLink","/sign-up",1,"text-decoration-none"]],template:function(n,e){1&n&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return e.onSubmit()}),t.TgZ(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"app-text-input",5)(6,"app-text-input",5),t.TgZ(7,"div",6)(8,"a",7),t._uU(9,"Cancel"),t.qZA(),t.TgZ(10,"button",8),t._uU(11,"Login"),t.qZA()(),t.TgZ(12,"a",9),t._uU(13,"Register"),t.qZA()()()()()()),2&n&&(t.Q6J("formGroup",e.loginForm),t.xp6(5),t.Q6J("formControl",e.loginForm.controls.email)("label","Username or Email")("type","email"),t.xp6(1),t.Q6J("formControl",e.loginForm.controls.password)("label","Password")("type","password"),t.xp6(4),t.Q6J("disabled",e.loginForm.invalid))},dependencies:[s.rH,p.t,o._Y,o.JJ,o.JL,o.oH,o.sg]}),r})()}];let E=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[s.Bz.forChild(B),s.Bz]}),r})();var z=i(294),Y=i(4466);let j=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[C.ez,E,z.I,Y.m]}),r})()}}]);