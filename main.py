import webapp2
import jinja2
import os
from google.appengine.api import users
from google.appengine.ext import ndb

class CssiUser(ndb.Model):
  first_name = ndb.StringProperty()
  last_name = ndb.StringProperty()
  email = ndb.StringProperty()
  lbs_recycled = ndb.IntegerProperty()
  items_recycled = ndb.StringProperty()


jinja_current_directory = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class LandingPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        signin_template = jinja_current_directory.get_template("Signin.html")
        welcome_template = jinja_current_directory.get_template("welcomepage.html")
        if not user:
            self.response.write(signin_template.render())
        if user:
            self.response.write(welcome_template.render())





app = webapp2.WSGIApplication([
    ('/', LandingPage),
], debug=True)
