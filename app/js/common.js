'use strict';

document.addEventListener( 'DOMContentLoaded', function( event ) {

    let windowWidth = window.innerWidth;

    /*******************************************************/
    //MENU
    /*******************************************************/
    ( function( $ ) {

        const $elemNav = $( '.header__menu' ),
           $buttonNav = $( '.header__menu-button' );

        $buttonNav.on( 'click', function( event ) {

            event.stopPropagation();

            if ( $( this )[ 0 ].hasAttribute( 'active' ) ) {
                $buttonNav.removeAttr( 'active' );
                $elemNav.removeAttr( 'active' );
            } else {
                $buttonNav.attr( 'active', '' );
                $elemNav.attr( 'active', '' );
            }
        } );


        $( document ).on( 'click', function( event ) {
            if ( ! event.target.closest( '.header__menu' ) ) {
                $buttonNav.removeAttr( 'active' );
                $elemNav.removeAttr( 'active' );
            }
        } );

    } ( jQuery ) );

    /*******************************************************/
    //SUBMENU ACCORDION
    /*******************************************************/
    ( function( $ ) {



        $( window ).on( 'load resize', function( event ) {

            const newWindowWidth = window.innerWidth;

            if ( ( event.type === 'load' ) || ( ( event.type === 'resize' ) && ( windowWidth !== newWindowWidth ) ) ) {

                windowWidth = newWindowWidth;

                if ( window.innerWidth <= 640 ) {

                    $( '.mobile-menu-accordion' ).each( function() {
                        const $this = $( this );
                        ( $this.hasClass('active') || $this.find('.active').length ) ? $this.attr('active', '').children('.mobile-menu-accordion__box').show() : $this.removeAttr( 'active' ).children('.mobile-menu-accordion__box').hide();
                    } );

                } else {

                    $( '.mobile-menu-accordion' ).each( function() {
                        $( this ).removeAttr( 'active' ).children('.mobile-menu-accordion__box').show();
                    } );
                }
            }
        } );


        $( '.mobile-menu-accordion' ).on( 'click', '.mobile-menu-accordion__title', function( event ) {
            if ( window.innerWidth <= 640 ) {

                const $this = $( this );

                if ( ! $this.closest( '.mobile-menu-accordion' )[ 0 ].hasAttribute( 'active' ) ) {

                    event.preventDefault();

                    $this.closest( '.mobile-menu-accordion' ).siblings().removeAttr( 'active' ).children( '.mobile-menu-accordion__box' ).slideUp( 300 ).end().end().closest( '.header__submenu-column' ).siblings().children( '.mobile-menu-accordion' ).removeAttr( 'active' ).children( '.mobile-menu-accordion__box' ).slideUp( 300 );

                    $this.closest( '.mobile-menu-accordion' ).attr( 'active', '' ).children( '.mobile-menu-accordion__box' ).slideDown( 300 );
                }
            }
        } );
    } ( jQuery ) );

    ( function( $ ) {

        $( '.header__slider' )
            // .wrapInner( '<div class="product__slider"></div>' ).find( '.product__slider' )
            .addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            items: 1,
            nav: false,
            // navText: '',
            autoplayTimeout: 10000,
            // autoplay: true,
            smartSpeed: 1200,
            // dotsContainer: '.product__thumbs',
            // animateOut: false,
            // animateIn: false,
            //
            // responsive: {
            //     0: {
            //         animateOut: false,
            //         animateIn: false,
            //     },
            //     480: {
            //         animateOut: 'fadeOut',
            //         animateIn: 'fadeIn',
            //
            //     },
            //     768: {
            //
            //     }
            // },
            onInitialize: function( event ) {
                // $( event.target ).after('<div class="product__thumbs"></div>');
                $( event.target ).find( '.header__slider-item' ).each( function () {
                    $( this ).attr( 'data-index', $( this ).index() + 1 );
                } );
            },
            onInitialized: function( event ) {
                $( event.target ).find( '.owl-item:not(.cloned) .header__slider-img img' ).each( function() {
                    $( event.target ).find( '.owl-dot' ).eq( $( this ).index( '.owl-item:not( .cloned ) .header__slider-img img' )).html( '<img src="' + $( this ).attr( 'src' ) + '">' );
                });
            }

        } );

    } ( jQuery ) );

} );
