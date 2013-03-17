var casper = require('casper').create(),
    pokeID, FBemail, FBpass;

if(casper.cli.has(2)){
    pokeID = casper.cli.get(0);
    FBemail = casper.cli.get(1);
    FBpass = casper.cli.get(2);
} else {
    this.echo('Usage: fbCasperPoke.js <pokeID> <FBemail> <FBpass>');
    casper.exit();
};

casper.start('https://www.facebook.com/login.php?next=http%3A%2F%2Fwww.facebook.com%2Fpokes%3Fnotif_t%3Dpoke', function(){
    this.echo("Loaded Login Page");
    this.echo(this.getTitle());
});

casper.then(function() {
    this.fill('form#login_form', { 
        email: FBemail, 
        pass:  FBpass
    }, true);
});

casper.then(function() {
    this.echo(this.getTitle());
});

casper.then(function() {
    if(this.exists(".uiIconText[ajaxify*='"+pokeID+"']")){
        this.click(".uiIconText[ajaxify*='"+pokeID+"']");
    } else {
        this.echo("Already poked");
    }
});

casper.run();