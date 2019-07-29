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
  item_list = ndb.KeyProperty(repeated = True)

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
        self.response.write(compete_template.render())


    def post(self):
        user = users.get_current_user()
        curr_user = CssiUser.query().filter(CssiUser.email == user.nickname()).get()
        all_users = CssiUser.query().order(-CssiUser.lbs_recycled).fetch()
        print all_users
        curr_item = Item(item_name = self.request.get('item'), item_weight = int(self.request.get('weight')))
        item_key = curr_item.put()
        curr_user.item_list.append(item_key)
        curr_user.lbs_recycled = curr_user.lbs_recycled + int(self.request.get('weight'))
        curr_user.put()
        item_list = []
        for key in curr_user.item_list:
            item_list.append(key.get())
        template_vars = {
        'all_users': all_users,
        'item_list': item_list
        }
        compete_template = jinja_current_directory.get_template("compete.html")
        self.response.write(compete_template.render(template_vars))

class AboutPage(webapp2.RequestHandler):
    def get(self):
        about_template = jinja_current_directory.get_template("about.html")
        self.response.write(about_template.render())

class LearnPage(webapp2.RequestHandler):
    def get(self):
        learn_template = jinja_current_directory.get_template("learnpage.html")
        self.response.write(learn_template.render())


app = webapp2.WSGIApplication([
    ('/', LandingPage),
    ('/signup', SignUpPage),
    ('/welcome', WelcomePage),
    ('/gamepage', GamePage),
    ('/compete', CompetePage),
    ('/aboutus', AboutPage),
    ('/learn', LearnPage)

], debug=True)
