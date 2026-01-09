from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Temporary storage (for learning purpose)
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_task():
    task = request.json.get('task')
    tasks.append({'task': task, 'completed': False})
    return jsonify(tasks)

@app.route('/complete/<int:task_id>', methods=['POST'])
def complete_task(task_id):
    tasks[task_id]['completed'] = True
    return jsonify(tasks)

@app.route('/delete/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    tasks.pop(task_id)
    return jsonify(tasks)

@app.route('/tasks')
def get_tasks():
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True)
