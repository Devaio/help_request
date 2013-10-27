Students = new Meteor.Collection('student');

if (Meteor.isClient) {
  Meteor.startup(function () {
    
  });

  Meteor.Router.add({

  '/' : 'request',

  '/teacher': 'teacher',

  '*': 'request'

  });

  Template.request.greeting = function () {
    return "Do you need some help...";
  };

  Template.request.events({
    'click button' : function () {
      // template data, if any, is available in 'this'
      $('.content').css('display', 'none');
      Students.insert ({
        student: $('input').val()
      });
      $('.container').append('<h1>Help is on the Way</h1>');
    }
  });

  Template.teacher.students = function () {
    return Students.find();
  };

  //this event should remove name from DOM, remove instance in
  //db and revert the students screen back to request form
  Template.teacher.events({
    'change input.chbx' : function () {
      var removeID = $(this).attr('data-id');
      Students.findByIdAndRemove(removeID, function (err, id) {
        console.log(removeID);
      });
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
