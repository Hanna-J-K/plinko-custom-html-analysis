function main(workbook: ExcelScript.Workbook) {
	let selectedSheet = workbook.getActiveWorksheet();
	// Paste to range A2 on selectedSheet from range A1:G24 on selectedSheet
	selectedSheet.getRange("A1:G24").moveTo(selectedSheet.getRange("A2"));
	// Paste to range A3 on selectedSheet from range B26:C26 on selectedSheet
	selectedSheet.getRange("B26:C26").moveTo(selectedSheet.getRange("A3"));
	// Set range A1 on selectedSheet
	selectedSheet.getRange("A1").setValue("HTML fragment developing guidance");
	// Set fill color to #000000 for range A2:G2 on selectedSheet
	selectedSheet.getRange("A2:G2").getFormat().getFill().setColor("#000000");
	// Set font bold to true for range A2:G2 on selectedSheet
	selectedSheet.getRange("A2:G2").getFormat().getFont().setBold(true);
	// Set font color to "#FFFFFF" for range A2:G2 on selectedSheet
	selectedSheet.getRange("A2:G2").getFormat().getFont().setColor("#FFFFFF");
	// Toggle auto filter on selectedSheet
	selectedSheet.getAutoFilter().apply(selectedSheet.getRange("A2:G2"));
	// Set font bold to true for range A3 on selectedSheet
	selectedSheet.getRange("A3").getFormat().getFont().setBold(true);
	let conditionalFormatting: ExcelScript.ConditionalFormat;
	// Create Contains Text criteria for range D:D on selectedSheet
	conditionalFormatting = selectedSheet.getRange("D:D").addConditionalFormat(ExcelScript.ConditionalFormatType.containsText);
	conditionalFormatting.getTextComparison().setRule({ operator: ExcelScript.ConditionalTextOperator.contains, text: "PASS" });
	conditionalFormatting.getTextComparison().getFormat().getFill().setColor("#ffc7ce");
	conditionalFormatting.getTextComparison().getFormat().getFont().setColor("#9c0006");
	conditionalFormatting.setStopIfTrue(false);
	conditionalFormatting.setPriority(0);
	// Create Contains Text criteria for range D:D on selectedSheet
	conditionalFormatting = selectedSheet.getRange("D:D").addConditionalFormat(ExcelScript.ConditionalFormatType.containsText);
	conditionalFormatting.getTextComparison().setRule({ operator: ExcelScript.ConditionalTextOperator.contains, text: "FAIL" });
	conditionalFormatting.getTextComparison().getFormat().getFill().setColor("#ffc7ce");
	conditionalFormatting.getTextComparison().getFormat().getFont().setColor("#9c0006");
	conditionalFormatting.setStopIfTrue(false);
	conditionalFormatting.setPriority(0);
	// Create Contains Text criteria for range D:D on selectedSheet
	conditionalFormatting = selectedSheet.getRange("D:D").addConditionalFormat(ExcelScript.ConditionalFormatType.containsText);
	conditionalFormatting.getTextComparison().setRule({ operator: ExcelScript.ConditionalTextOperator.contains, text: "PASS" });
	conditionalFormatting.getTextComparison().getFormat().getFill().setColor("#c6efce");
	conditionalFormatting.getTextComparison().getFormat().getFont().setColor("#006100");
	conditionalFormatting.setStopIfTrue(false);
	conditionalFormatting.setPriority(0);
	// Auto fill range
	selectedSheet.getRange("A23:A25").autoFill("A23:A29", ExcelScript.AutoFillType.fillDefault);
	// Set range B26:B27 on selectedSheet
	selectedSheet.getRange("B26:B27").setValues([["Google Lighthouse"],["WAVE"]]);
	// Paste to range C26 on selectedSheet from range B26:B27 on selectedSheet
	selectedSheet.getRange("B26:B27").moveTo(selectedSheet.getRange("C26"));
	// Set range B26 on selectedSheet
	selectedSheet.getRange("B26").setValue("Accessibility reports");
	// Auto fill range
	selectedSheet.getRange("B26").autoFill("B26:B29", ExcelScript.AutoFillType.fillDefault);
	// Set range C28:C29 on selectedSheet
	selectedSheet.getRange("C28:C29").setValues([["W3C NU"],["DevAxe"]]);
	// Set horizontal alignment to ExcelScript.HorizontalAlignment.general for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setHorizontalAlignment(ExcelScript.HorizontalAlignment.general);
	selectedSheet.getRange("A2:G29").getFormat().setIndentLevel(0);
	// Set vertical alignment to ExcelScript.VerticalAlignment.bottom for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setVerticalAlignment(ExcelScript.VerticalAlignment.bottom);
	selectedSheet.getRange("A2:G29").getFormat().setIndentLevel(0);
	// Set wrap text to true for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setWrapText(true);
	// Set text orientation to 0 for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setTextOrientation(0);
	// Indent set to 0 for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setIndentLevel(0);
	// Set horizontal alignment to ExcelScript.HorizontalAlignment.general for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setHorizontalAlignment(ExcelScript.HorizontalAlignment.general);
	selectedSheet.getRange("A2:G29").getFormat().setIndentLevel(0);
	// Set vertical alignment to ExcelScript.VerticalAlignment.top for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setVerticalAlignment(ExcelScript.VerticalAlignment.top);
	selectedSheet.getRange("A2:G29").getFormat().setIndentLevel(0);
	// Set wrap text to true for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setWrapText(true);
	// Set text orientation to 0 for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setTextOrientation(0);
	// Indent set to 0 for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().setIndentLevel(0);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.diagonalDown).setStyle(ExcelScript.BorderLineStyle.none);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.diagonalUp).setStyle(ExcelScript.BorderLineStyle.none);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeLeft).setStyle(ExcelScript.BorderLineStyle.continuous);
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeLeft).setWeight(ExcelScript.BorderWeight.thin);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeTop).setStyle(ExcelScript.BorderLineStyle.continuous);
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeTop).setWeight(ExcelScript.BorderWeight.thin);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeBottom).setStyle(ExcelScript.BorderLineStyle.continuous);
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeBottom).setWeight(ExcelScript.BorderWeight.thin);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeRight).setStyle(ExcelScript.BorderLineStyle.continuous);
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.edgeRight).setWeight(ExcelScript.BorderWeight.thin);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.insideVertical).setStyle(ExcelScript.BorderLineStyle.continuous);
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.insideVertical).setWeight(ExcelScript.BorderWeight.thin);
	// Set border for range A2:G29 on selectedSheet
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.insideHorizontal).setStyle(ExcelScript.BorderLineStyle.continuous);
	selectedSheet.getRange("A2:G29").getFormat().getRangeBorder(ExcelScript.BorderIndex.insideHorizontal).setWeight(ExcelScript.BorderWeight.thin);
	// Delete range 7:7 on selectedSheet
	selectedSheet.getRange("7:7").delete(ExcelScript.DeleteShiftDirection.up);
	// Auto fill range
	selectedSheet.getRange("A4:A6").autoFill("A4:A28", ExcelScript.AutoFillType.fillDefault);
	// Paste to range A29 on selectedSheet from range A27:G28 on selectedSheet
	selectedSheet.getRange("A29").copyFrom(selectedSheet.getRange("A27:G28"), ExcelScript.RangeCopyType.all, false, false);
	// Set range B29 on selectedSheet
	selectedSheet.getRange("B29").setValue("Documentation");
	// Paste to range B30 on selectedSheet from range B29 on selectedSheet
	selectedSheet.getRange("B30").copyFrom(selectedSheet.getRange("B29"), ExcelScript.RangeCopyType.all, false, false);
	// Set range C29:C30 on selectedSheet
	selectedSheet.getRange("C29:C30").setValues([["Fragment documentation"], ["Analysis documentation"]]);
	// This action currently can't be recorded.
	// Set range D30 on selectedSheet
	selectedSheet.getRange("D30").setValue("FAIL");
	
}