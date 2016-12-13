/*
ba.directives.FooterTopScroller.js
Provides a button that animates scrolling to the top of the page.

Copyright (c) 2016

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('footerTopscroller', footerTopscroller);

  function footerTopscroller() {
    var directive = {
      restrict: 'E',
      replace: true,
      template: '<a><span class="glyphicon glyphicon-chevron-up"></span></a>',
      link: function(scope, element, attrs) {
        element.attr('href', '#');
        element.addClass('pull-right top topscroller');
        element.on('click', function() {
          $('html, body').animate({scrollTop: 0}, 'slow');
          return false;
        });

        $(document).on('scroll', function() {
      		if ($(window).scrollTop() > 200) {
      			$(element).addClass('active');
      		} else {
      			$(element).removeClass('active');
      		}
      	});
      }
    };

    return directive;
  }

})();
