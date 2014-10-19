(function(jQuery){

  // Globale Variable pro Session
  var globalVar = true;
  var pluginName = "Plugin";

  // Array für Sprachvarianten
  var languageArray = new Array();

  languageArray['salutation'] = new Array();
  languageArray['salutation']['de'] = 'Hallo';
  languageArray['salutation']['en'] = 'Hello';

  jQuery.fn.Plugin = function ( options ){

      var defaults = {
        lang: 'de',
        html: {
          salutationContainer: 'b.salutation',
          form: {
            input: 'input[name="newname"]',
            button: 'input[type="submit"]'
          }
        },
        data: {
          nameContainer: 'name'
        }
      };

      // Globale Variable pro Instanz
      var _self = this;
      var options = jQuery.extend( defaults, options );  

      // Private Functions
      var methods = {

          init: function( options ){
            methods.initItems();
            methods.sayHello();
          },

          initItems: function () {
            _self.find( options.html.form.button ).click( function ( event ) {
              event.preventDefault();

              var newName = _self.find( options.html.form.input ).val();

              if ( newName != "" ) {
                methods.changeName(newName);
                methods.sayHello();
              }
            });
          },

          sayHello: function(){
            _self
              .find( options.html.salutationContainer )
              .html( languageArray['salutation'][options.lang] + ' ' + _self.data( options.data.nameContainer ) );
          }, 

          changeName: function ( newName ) {
            _self.data( options.data.nameContainer, newName );
            console.log( _self, _self.data( options.data.nameContainer, newName ) );
          }

      };

      // Puplic Functions
      _self.changeName = function ( newName ){
        if ( newName != "" ) {
          methods.changeName( newName );
          methods.sayHello();
        }
      };

      // Return of each item by initialization
      return this.each( function (){
        methods.init( options );
      });

  }

  $(window).on('load', function () {

    $('[data-jsinit="Plugin"]').each(function () {
      var $element = $(this)
      $element[pluginName]($element.data())
    })
  });

})(jQuery);