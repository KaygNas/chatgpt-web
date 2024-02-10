当然可以。以下是一个使用Python和Tkinter库编写的简单面向对象的GUI计算器示例代码：

```python
import tkinter as tk

class SimpleCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Simple Calculator")

        self.result_var = tk.StringVar()

        self.create_widgets()

    def create_widgets(self):
        entry_result = tk.Entry(self.root, textvariable=self.result_var, justify='right', font=('Arial', 24))
        entry_result.grid(row=0, column=0, columnspan=4, sticky='nsew')

        button_layout = [
            ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3),
            ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3),
            ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
            ('0', 4, 0), ('.', 4, 1), ('+', 4, 2),
            ('C', 4, 3), ('=', 5, 3)
        ]

        for (text, row, column) in button_layout:
            button = tk.Button(self.root, text=text, font=('Arial', 20), command=lambda t=text: self.on_button_click(t))
            button.grid(row=row, column=column, sticky='nsew')

        self.root.grid_rowconfigure(1, weight=1)
        for i in range(4):
            self.root.grid_rowconfigure(i+1, weight=1)
            self.root.grid_columnconfigure(i, weight=1)

    def on_button_click(self, value):
        if value == 'C':
            self.result_var.set('')
        elif value == '=':
            try:
                self.result_var.set(eval(self.result_var.get()))
            except (SyntaxError, ZeroDivisionError):
                self.result_var.set('Error')
        else:
            self.result_var.set(self.result_var.get() + value)

if __name__ == '__main__':
    root = tk.Tk()
    app = SimpleCalculator(root)
    root.mainloop()
```

这段代码定义了一个名为`SimpleCalculator`的类，该类创建了一个GUI窗口，并在其中添加了数字按钮、基本运算符和一个显示屏。所有按钮的功能都是通过绑定到`on_button_click`方法来实现的。用户点击按钮时，该方法会被调用，并根据点击的按钮更新显示区域。

请注意，此代码片段使用了Python内置函数`eval`来计算表达式的值，这在实际应用中可能存在安全风险，因为`eval`可以执行任意代码。在生产环境中，应使用更安全的方法解析和计算表达式。

要运行此代码，您需要有Python环境以及Tkinter库。大多数Python安装都已包含Tkinter，因此您应该可以直接运行这段代码。