import 'package:flutter/material.dart';

class Help extends StatelessWidget {
  const Help({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF262626),
      body: Center(
        child: Column(
          children: const [
            SizedBox(height: 100),
            Text(
              "How to use Sleep App",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            SizedBox(height: 25),
            Card(
              color: Color(0xFF333333),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(20)),
              ),
              child: SizedBox(
                width: 335,
                child: Padding(
                  padding: EdgeInsets.all(15),
                  child: Text(
                    "This app is made to track your breathing patterns and sleep position. The data collected will be sent to your physician for analysis.\n\n1. Securely position device across chest with strap\n2. Press the central button and confirm to begin tracking your sleep\n3. Press the central button again to stop recording\n4. The recording is automatically sent to your physician -  no need to do anything else!",
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
