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
        start_template = jinja_current_directory.get_template("welcomepage.html")
        self.response.write(start_template.render())

    #Post Method, need to figure out how to link to
    #def post(self):
    #    user = users.get_current_user()
        #if not user:
      # You shouldn't be able to get here without being logged in
        #    self.error(500)
        #    return
    #    cssi_user = CssiUser(
    #        first_name=self.request.get('first_name'),
    #        last_name=self.request.get('last_name'),
    #        id=user.user_id())
    #    cssi_user.put()
    #    self.response.write('Thanks for signing up, %s!' %
    #    cssi_user.first_name)

    #    start_template = jinja_current_directory.get_template("welcomepage.html")
    #    self.response.write(start_template.render())

app = webapp2.WSGIApplication([
  ('/', LandingPage)
], debug=True)
