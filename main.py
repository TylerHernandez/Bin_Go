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
  item_list = ndb.StringProperty(repeated = True)

class Item(ndb.Model):
    item_name = ndb.StringProperty()
    item_weight = ndb.IntegerProperty()


jinja_current_directory = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class LandingPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        if user:
            if not CssiUser.query(CssiUser.email == user.email()).get():
                self.redirect('/signup')
            else:
                self.redirect('/welcome')

        login_url = users.create_login_url('/')
        template_vars = {
            'login_url' : login_url
        }

        signin_template = jinja_current_directory.get_template("Signin.html")
        self.response.write(signin_template.render(template_vars))

    #def post (self):
        #new_first_name = self.request.get('FirstName')
        #new_last_name = self.request.get('LastName')


class SignUpPage(webapp2.RequestHandler):
    def get(self):
        signup_template = jinja_current_directory.get_template("Signup.html")
        self.response.write(signup_template.render())
    def post(self):
        user = users.get_current_user()
        curr_first_name = self.request.get('FirstName')
        curr_last_name = self.request.get('LastName')
        curr_email = user.email()
        curr_lbs_recycled = 0
        curr_items_recycled = []
        curr_user = CssiUser(
            first_name = curr_first_name,
            last_name = curr_last_name,
            email = curr_email,
            lbs_recycled = curr_lbs_recycled,
            item_list = curr_items_recycled
            )
        curr_user.put()
        self.redirect('/welcome')


class WelcomePage(webapp2.RequestHandler):
    def get(self):
        welcome_template = jinja_current_directory.get_template("welcomepage.html")
        self.response.write(welcome_template.render())

class GamePage(webapp2.RequestHandler):
    def get(self):
        game_template = jinja_current_directory.get_template("gamepage.html")
        self.response.write(game_template.render())



class CompetePage(webapp2.RequestHandler):
    def get(self):
        compete_template = jinja_current_directory.get_template("compete.html")
        template_vars = {
        'username': CssiUser.first_name,
        'userscore': CssiUser.lbs_recycled
        }








app = webapp2.WSGIApplication([
    ('/', LandingPage),
    ('/signup', SignUpPage),
    ('/welcome', WelcomePage),
    ('/gamepage', GamePage),
    ('/compete', CompetePage)

], debug=True)
