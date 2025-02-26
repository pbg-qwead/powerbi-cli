/*
 * Copyright (c) 2020 Jan Pieter Posthuma / DataScenarios
 *
 * All rights reserved.
 *
 * MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { ModuleCommand } from "../../lib/command";
import { listDatasourceAction } from "./list";
import { updateDatasourceAction } from "./update";

export function getCommands(): ModuleCommand {
    const listCommand = new ModuleCommand("list")
        .description("List the datasources of a Power BI report [DEFAULT]")
        .action(listDatasourceAction)
        .option("--workspace -w <name>", "Name or ID of the Power BI workspace. If not provided it uses 'My workspace'")
        .option("--report -r <report>", "Name or ID of the Power BI report");
    listCommand.addGlobalOptions();
    const updateCommand = new ModuleCommand("update")
        .description("Update the datasources of a Power BI paginated report")
        .action(updateDatasourceAction)
        .option("--workspace -w <name>", "Name or ID of the Power BI workspace. If not provided it uses 'My workspace'")
        .option("--report -r <report>", "Name or ID of the Power BI report")
        .option("--update-details <data>", "String with the paginated report datasources details in JSON format")
        .option("--update-details-file <file>", "File with the paginated report datasources details in JSON format");
    updateCommand.addGlobalOptions();
    const parameterCommand = new ModuleCommand("datasource")
        .description("Manages the datasources of a Power BI dataset")
        .addCommand(listCommand, { isDefault: true })
        .addCommand(updateCommand);
    parameterCommand.addGlobalOptions();
    return parameterCommand;
}
