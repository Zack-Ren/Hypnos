import 'package:flutter/material.dart';
import 'package:sleep_app/widgets/login_form.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.1, 0.9],
            colors: const [
              Color(0xFF676385),
              Color(0xFF262626),
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              SizedBox(height: 200),
              Image(
                image: AssetImage('lib/assets/logo.png'),
                width: 200,
              ),
              LoginForm(),
              Spacer(),
              TextButton(
                onPressed: null,
                child: Text("About Us", style: TextStyle(color: Colors.white)),
              )
            ],
          ),
        ),
      ),
    );
  }
}
