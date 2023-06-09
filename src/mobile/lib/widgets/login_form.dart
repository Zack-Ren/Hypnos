import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sleep_app/models/data.dart';
import 'package:sleep_app/services/api_service.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  LoginFormState createState() {
    return LoginFormState();
  }
}

class LoginFormState extends State<LoginForm> {
  final userController = TextEditingController();
  final passwordController = TextEditingController();

  bool _isLoading = false;
  bool _isChecked = false;
  bool loggedIn = true;

  @override
  void initState() {
    super.initState();
    userController.addListener(() {
      print(userController.text);
    });
    passwordController.addListener(() {
      print(passwordController.text);
    });
  }

  @override
  void dispose() {
    userController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
            child: TextFormField(
              validator: (String? value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter username';
                } else {
                  return null;
                }
              },
              controller: userController,
              decoration: InputDecoration(
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                hintText: "Username",
                hintStyle: TextStyle(color: Colors.white),
              ),
              style: TextStyle(color: Colors.white),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 10),
            child: TextFormField(
              validator: (String? value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter password';
                } else {
                  return null;
                }
              },
              controller: passwordController,
              decoration: InputDecoration(
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.white),
                  ),
                  focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.white),
                  ),
                  hintText: "Password",
                  hintStyle: TextStyle(color: Colors.white)),
              style: TextStyle(color: Colors.white),
              obscureText: true,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: 50),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Row(
                children: [
                  Checkbox(
                      value: _isChecked,
                      onChanged: (bool? value) {
                        setState(() {
                          _isChecked = value!;
                        });
                      },
                      checkColor: Colors.black,
                      activeColor: Colors.white,
                      side: BorderSide(color: Colors.white)),
                  Text(
                    "Remember me",
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  )
                ],
              ),
            ),
          ),
          Text(
            loggedIn ? "" : "No matching username/password found.",
            style: TextStyle(color: Colors.red),
          ),
          SizedBox(height: 50),
          CircleAvatar(
            radius: 30,
            backgroundColor: Color(0xFF7F78AB),
            child: _isLoading
                ? CircularProgressIndicator(color: Colors.white)
                : IconButton(
                    iconSize: 25,
                    icon: const Icon(Icons.arrow_forward_sharp),
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        setState(() {
                          _isLoading = true;
                        });
                        List<String> response = await ApiService.userLogin(
                            userController.text, passwordController.text);
                        setState(() {
                          _isLoading = false;
                        });
                        if (response[0] != '-1') {
                          DataModel.setId(response[0]);
                          DataModel.setDocId(response[1]);
                          if (context.mounted) context.go('/home');
                        }
                      }
                    },
                    color: Colors.white,
                  ),
          ),
        ],
      ),
    );
  }
}
