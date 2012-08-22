(function($) {
  // Detect support for CSS 3D transforms
  supports3DTransforms = document.body.style['WebkitPerspective'] !== undefined ||
                         document.body.style['MozPerspective'] !== undefined ||
                         document.body.style['msPerspective'] !== undefined ||
                         document.body.style['OPerspective'] !== undefined ||
                         document.body.style['perspective'] !== undefined;

  function overviewIsActive() {
    return $('.reveal').hasClass('overview');
  }

  function shimOnDocumentKeyDown(e) {
    // Disregard the event if the target is editable or a
    // modifier is present
    if (e.target.contentEditable != 'inherit' || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    var triggered = false;

    switch (e.which) {
      // p, page up
      case 80: case 33: Reveal.navigatePrev(); triggered = true; break;
      // n, page down
      case 78: case 34: Reveal.navigateNext(); triggered = true; break;
      // h, left
      case 72: case 37: Reveal.navigateLeft(); triggered = true; break;
      // l, right
      case 76: case 39: Reveal.navigateRight(); triggered = true; break;
      // k, up
      case 75: case 38: Reveal.navigateUp(); triggered = true; break;
      // j, down
      case 74: case 40: Reveal.navigateDown(); triggered = true; break;
      // home
      case 36: Reveal.navigateTo( 0 ); triggered = true; break;
      // end
      case 35: Reveal.navigateTo( Number.MAX_VALUE ); triggered = true; break;
      // space
      case 32: overviewIsActive() ? Reveal.toggleOverview() : Reveal.navigateNext(); triggered = true; break;
      // return
      case 13:
        if (overviewIsActive()) {
          Reveal.toggleOverview(); triggered = true;
        }
        break;
    }

    if (triggered) {
      e.preventDefault();
      e.stopPropagation();
    }
    else if (e.which === 27 && supports3DTransforms) {
      Reveal.toggleOverview();

      e.preventDefault();
      e.stopPropagation();
    }
  }

	/**
	 * Handler for the document level 'touchstart' event,
	 * enables support for swipe and pinch gestures.
	 */
	function onDocumentTouchStart( event ) {
		touch.startX = event.touches[0].clientX;
		touch.startY = event.touches[0].clientY;
		touch.startCount = event.touches.length;

		// If there's two touches we need to memorize the distance 
		// between those two points to detect pinching
		if( event.touches.length === 2 ) {
			touch.startSpan = distanceBetween( {
				x: event.touches[1].clientX,
				y: event.touches[1].clientY
			}, {
				x: touch.startX,
				y: touch.startY
			} );
		}
	}
	
	/**
	 * Handler for the document level 'touchmove' event.
	 */
	function onDocumentTouchMove( event ) {
		// Each touch should only trigger one action
		if( !touch.handled ) {
			var currentX = event.touches[0].clientX;
			var currentY = event.touches[0].clientY;

			// If the touch started off with two points and still has 
			// two active touches; test for the pinch gesture
			if( event.touches.length === 2 && touch.startCount === 2 ) {

				// The current distance in pixels between the two touch points
				var currentSpan = distanceBetween( {
					x: event.touches[1].clientX,
					y: event.touches[1].clientY
				}, {
					x: touch.startX,
					y: touch.startY
				} );

				// If the span is larger than the desire amount we've got 
				// ourselves a pinch
				if( Math.abs( touch.startSpan - currentSpan ) > touch.threshold ) {
					touch.handled = true;

					if( currentSpan < touch.startSpan ) {
						activateOverview();
					}
					else {
						deactivateOverview();
					}
				}

			}
			// There was only one touch point, look for a swipe
			else if( event.touches.length === 1 ) {
				var deltaX = currentX - touch.startX,
					deltaY = currentY - touch.startY;

				if( deltaX > touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
					touch.handled = true;
					Reveal.navigateLeft();
				} 
				else if( deltaX < -touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
					touch.handled = true;
					Reveal.navigateRight();
				} 
				else if( deltaY > touch.threshold ) {
					touch.handled = true;
					Reveal.navigateUp();
				} 
				else if( deltaY < -touch.threshold ) {
					touch.handled = true;
					Reveal.navigateDown();
				}
			}

			event.preventDefault();
		}
	}

	/**
	 * Handler for the document level 'touchend' event.
	 */
	function onDocumentTouchEnd( event ) {
		touch.handled = false;
	}

	/**
	 * Handler for the window level 'hashchange' event.
	 * 
	 * @param {Object} event
	 */
	function onWindowHashChange( event ) {
		// Break the hash down to separate components
		var bits = window.location.hash.slice(2).split('/');
		
		// Read the index components of the hash
		indexh = parseInt( bits[0] ) || 0 ;
		indexv = parseInt( bits[1] ) || 0 ;
		
		Reveal.navigateTo( indexh, indexv );
	}

  // Remove reveal's listeners and add our jQuery listeners.
  $(document).keydown(shimOnDocumentKeyDown);
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  document.addEventListener( 'touchend', onDocumentTouchEnd, false );
  window.addEventListener( 'hashchange', onWindowHashChange, false );

/**
		if ( config.controls && dom.controls ) {
			dom.controlsLeft.addEventListener( 'click', preventAndForward( navigateLeft ), false );
			dom.controlsRight.addEventListener( 'click', preventAndForward( navigateRight ), false );
			dom.controlsUp.addEventListener( 'click', preventAndForward( navigateUp ), false );
			dom.controlsDown.addEventListener( 'click', preventAndForward( navigateDown ), false );	
		}
*/
}(jQuery));
