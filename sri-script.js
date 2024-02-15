console.clear();

var myPhotos = [
    { url: '/assets/photo1.jpg', caption: 'Cancoochieee' },
    { url: '/assets/photo2.jpg', caption: 'my best birthday ever' },
    { url: '/assets/photo3.jpg', caption: 'my fav iphone contacts pic' },
    { url: '/assets/photo4.jpg', caption: '"It\'s Gentle Monster" 🐲🧧' },
    { url: '/assets/photo5.jpg', caption: 'my other fav lil rat 😍' },
    { url: '/assets/photo6.jpg', caption: 'AI us' }, // Updated path
    { url: '/assets/photo7.jpg', caption: 'Ezoo!' },
    { url: '/assets/photo8.jpg', caption: 'our first date :)' },
    { url: '/assets/photo9.jpg', caption: 'KOREAAA' },
    { url: '/assets/photo10.jpg', caption: 'ATL HOE!' },
    { url: '/assets/photo11.jpg', caption: 'SriDC!' }, // Updated path
    { url: '/assets/photo12.jpg', caption: 'SriDC pt 2' }, // Updated path
];

var myNote = { url: '/assets/myNote.jpg', caption: 'My Special Note' };

getPhotos();

function getPhotos() {
    $('.photos').html('');
    $.each(myPhotos, function(i, photo) {
        $('<div class="drag" data-i="' + i + '"><figure class="spin"><img src="' + photo.url + '" alt="Photo ' + (i + 1) + '" /><figcaption class="polaroid-caption">' + photo.caption + '</figcaption></figure></div>').appendTo('.photos');
    });
    $('<div class="drag note-item" style="z-index: -1;"><figure class="spin"><img src="' + myNote.url + '" alt="My Note" /><figcaption class="polaroid-caption">' + myNote.caption + '</figcaption></figure></div>').appendTo('.photos');
    scatterPhotos();
}

function scatterPhotos() {
    var board = $('.photos');
    var drag = $('.drag');
    var spin = $('.spin');

    $(drag.get().reverse()).each(function(index) {
        TweenLite.to(this, .5, {
            delay: index * 0.1,
            x: getRandomInt(board.width() / 3 * -1, board.width() / 3),
            y: getRandomInt(board.height() / 3 * -1, board.height() / 3)
        });
        TweenLite.to($(this).find('.spin'), .5, {
            delay: index * 0.1,
            rotation: getRandomInt(-30, 30)
        });
    });

    Draggable.create(drag, {
        bounds: board,
        throwProps: true,
        edgeResistance: 0,
        type: 'x,y',
        zIndexBoost: false,
        onClick: function(e) {
            var $this = $(e.target).closest('.drag');
            if (!$this.hasClass('active')) {
                // Enlarge the photo if it's not already active
                $this.addClass('active').css({
                    transform: 'scale(2)',
                    zIndex: 9999 // Ensure it's above other photos
                });
                $('body').addClass('full');
            } else {
                // Reset the photo if it's already active
                $this.removeClass('active').css({
                    transform: '',
                    zIndex: '' // Reset z-index
                });
                $('body').removeClass('full');
            }
        },
        onDrag: function() {
            resetPhoto($(this.target));
        },
        onThrowComplete: function() {
            adjustRotation($(this.target).find('.spin'));
        }
    });

    Draggable.create(spin, {
        type: 'rotation',
        throwProps: true,
        throwResistance: 25000,
        minDuration: 0
    });
}

function resetPhoto($photo) {
    TweenLite.to($photo, .2, {
        scaleX: 1,
        scaleY: 1,
        x: $photo.attr('data-x'),
        y: $photo.attr('data-y')
    });
    TweenLite.to($photo.find('.spin'), .2, {
        rotation: $photo.attr('data-r')
    });
    $photo.removeClass('active');
    $('body').removeClass('full');
}

function enlargePhoto($photo, $allPhotos) {
    $photo.attr('data-x', $photo[0]._gsTransform.x)
          .attr('data-y', $photo[0]._gsTransform.y)
          .attr('data-r', $photo.find('.spin')[0]._gsTransform.rotation);
    TweenLite.to($photo, .2, {
        scaleX: 2,
        scaleY: 2,
        x: 0,
        y: 0
    });
    TweenLite.to($photo.find('.spin'), .2, {
        rotation: 0
    });
    $allPhotos.not('.active').each(function() {
        resetPhoto($(this));
    });
    $photo.addClass('active').appendTo('.photos');
    $('body').addClass('full');
}

function adjustRotation($spinElement) {
    var rotation = $spinElement[0]._gsTransform.rotation;
    if (rotation > 360 || rotation < -360) {
        rotation = rotation % 360;
        TweenLite.to($spinElement, 0, {
            rotation: rotation
        });
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
