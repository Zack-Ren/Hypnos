import 'package:flutter/material.dart';
import 'package:sleep_app/models/data.dart';
import 'package:sleep_app/models/patient_model.dart';
import 'package:sleep_app/services/api_service.dart';
import 'package:sleep_app/widgets/record_btn.dart';

class Recording extends StatefulWidget {
  const Recording({super.key});

  @override
  State<Recording> createState() => _RecordingState();
}

class _RecordingState extends State<Recording> {
  late Future<PatientModel> patient;

  @override
  void initState() {
    super.initState();
    patient = ApiService.getPatient(DataModel.getId());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF262626),
      body: FutureBuilder<PatientModel>(
        future: patient,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Center(
              child: Column(
                children: [
                  SizedBox(height: 100),
                  Text(
                    "Hi ${snapshot.data!.name}!",
                    style: TextStyle(color: Colors.white, fontSize: 24),
                  ),
                  SizedBox(height: 50),
                  Text(
                    "Record your sleep",
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                  SizedBox(height: 75),
                  RecordButton(),
                ],
              ),
            );
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
