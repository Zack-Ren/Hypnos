import 'dart:developer';

import 'package:mongo_dart/mongo_dart.dart';
import 'package:sleep_app/database/constants.dart';
import 'package:sleep_app/models/diagnostic_model.dart';

class Database {
  static var db, diagnosticCollection;

  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    inspect(db);
    diagnosticCollection = db.collection(DIAGNOSTIC_COLLECTION);
  }

  static Future<String> insertDiagnostics(DiagnosticsModel data) async {
    try {
      var result = await diagnosticCollection.insertOne(data.toJson());
      if (result.isSuccess) {
        return "Inserted successfully";
      } else {
        return "Insert failed";
      }
    } catch (e) {
      return e.toString();
    }
  }
}
