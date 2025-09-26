// src/app/api/submit-form/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

type FormData = {
  name: string;
  email: string;
  telefono: string;
  comment: string;
};

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    // Validaciones básicas
    if (!body.name || !body.email || !body.telefono) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    // Verificar variables de entorno
    if (
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
      !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.error("Faltan variables de entorno requeridas");
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

    // Limpiar y verificar el spreadsheetId
    const spreadsheetId = process.env.GOOGLE_SHEET_ID.trim();
    console.log("Spreadsheet ID:", spreadsheetId); // Para debug

    if (spreadsheetId.includes("/") || spreadsheetId.includes("%")) {
      return NextResponse.json(
        {
          error:
            "ID de hoja de cálculo mal formateado. Solo debe contener el ID.",
        },
        { status: 500 }
      );
    }

    // Autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ auth, version: "v4" });

    const timestamp = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
    });

    // Añadir fila - especifica el nombre de la hoja si es necesario
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: "A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [body.name, body.email, body.telefono, body.comment || "", timestamp],
        ],
      },
    });

    return NextResponse.json({
      message: "¡Formulario enviado con éxito!",
      data: response.data,
    });
  } catch (error) {
    console.error("Error completo:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: "Error al escribir en Google Sheets", details: errorMessage },
      { status: 500 }
    );
  }
}
