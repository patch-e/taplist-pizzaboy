/*
ba.directives.FooterTopScroller.js
Provides a button that animates scrolling to the top of the page.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.directives')
.directive('footerTopscroller', function() {

  return {
    restrict: 'A',
    template: '<span class="glyphicon glyphicon-chevron-up"></span>',
    link: function(scope, element, attrs) {
      element.attr('href', '');
      element.addClass('pull-right top topScroller');
      element.on('click', function() {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
      });
    }
  };

});
