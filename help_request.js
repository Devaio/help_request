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
      var newStudent = $('input').val();
      Students.insert ({
        student: newStudent
      });
      $('.container').append('<h1>Help is on the Way</h1>');
      console.log(Students.find());
      // if(newStudent._id === removeID){
      //   $('.content').css('display', 'block');
      // }
    }
  });

  Template.teacher.students = function () {
    return Students.find();
  };

  //revert the students screen back to request form
  Template.teacher.events({
    'change input.chbx' : function () {
      var removeID = this._id;
      return Students.remove(removeID);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
