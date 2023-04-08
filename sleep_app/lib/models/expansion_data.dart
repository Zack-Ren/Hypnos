/// Holds diagnostic events and ExpansionPanel identifier for graph generation on stats page

import 'package:sleep_app/models/diagnostic_model.dart';

class ExpansionData {
  DiagnosticsModel data;
  bool isExpanded;

  ExpansionData(this.data, this.isExpanded);
}
