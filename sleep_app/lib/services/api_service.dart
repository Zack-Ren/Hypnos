import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:sleep_app/models/data.dart';
import 'package:sleep_app/models/doctor_model.dart';
import 'package:sleep_app/models/event_model.dart';
import 'package:sleep_app/models/patient_model.dart';
import 'package:sleep_app/models/diagnostic_model.dart';
import 'package:sleep_app/services/constants.dart';

class ApiService {
  static Future<String> insertDiagnostic(DiagnosticsModel data) async {
    var uri = Uri.parse("$baseUrl$diagnosticEndpoint");

    final response = await http.post(uri,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(data.toJson()));
    return response.statusCode.toString();
    // if (response.statusCode == 201) {
    //   return DiagnosticsModel.fromJson(jsonDecode(response.body));
    // } else {
    //   throw Exception("Insert failed");
    // }
  }

  static Future<List<DiagnosticsModel>> getDiagnostic() async {
    var uri = Uri.parse("$baseUrl$diagnosticEndpoint");
    final response = await http.get(uri);

    List<DiagnosticsModel> ret = [];

    if (response.statusCode == 200) {
      for (var r in jsonDecode(response.body)) {
        if (r['patientId'] == DataModel.getId()) {
          ret.add(DiagnosticsModel.fromJson(r));
        }
      }
      return ret;
    } else {
      throw Exception("Get failed");
    }
  }

  static Future<PatientModel> getPatient(String id) async {
    var uri = Uri.parse("$baseUrl$patientEndpoint/$id");
    var response = await http.get(uri);
    if (response.statusCode == 200) {
      return PatientModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("Failed to load patient data");
    }
  }

  static Future<DoctorModel> getDoctor(String id) async {
    var uri = Uri.parse("$baseUrl$doctorEndpoint/$id");
    var response = await http.get(uri);
    if (response.statusCode == 200) {
      return DoctorModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("Failed to load doctor data");
    }
  }

  static Future<List<String>> userLogin(
      String username, String password) async {
    var uri = Uri.parse(baseUrl + loginEndpoint);
    final response = await http.post(
      uri,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        "username": username,
        "password": password,
      }),
    );

    if (response.statusCode == 200) {
      List<String> ret = [
        PatientModel.fromJson(jsonDecode(response.body)).id,
        PatientModel.fromJson(jsonDecode(response.body)).doctorId
      ];
      return ret;
    } else {
      return ["-1"];
    }
  }

  static Future<EventModel> getEventForPatient(String id) async {
    var uri = Uri.parse("$baseUrl$eventEndpoint/Filter?patientId=$id");
    var response = await http.get(uri);
    if (response.statusCode == 200) {
      return EventModel.fromJson(jsonDecode(response.body).last);
    } else {
      throw Exception("Failed to load event data");
    }
  }

  static Future<String> updateEvent(String id, EventModel data) async {
    var uri = Uri.parse("$baseUrl$eventEndpoint/$id");
    var response = await http.put(
      uri,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(data.toJson()),
    );
    return (response.statusCode.toString());
  }
}
