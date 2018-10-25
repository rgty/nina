from flask import Flask, render_template, request
from flask_uploads import UploadSet, configure_uploads, ALL

app = Flask(__name__)

files = UploadSet('files', ALL)

app.config['UPLOADED_FILES_DEST'] = 'uploads'
configure_uploads(app, files)

@app.route('/upload', methods=['GET','POST'])
def upload():
	try:
		print(request.files)
		if request.method == 'POST' and 'media' in request.files:
			filename = files.save(request.files['media'])
	except Exception as e:
		print(str(e))
	return render_template('progress-bar.html')

@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)