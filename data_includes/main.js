PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()

//var counterOverride = 1;
PennController.SetCounter( "setcounter" );

Sequence("setcounter", "consent", "intro", "instruction", randomize("trial_prac"), "instruction2", /*rshuffle("trial_agr-att", "trial_that", "trial_experiencer", "trial_fillers", "trial_whif"), "feedback",*/ SendResults(), "bye")

newTrial( "consent" ,
    newText("CONSENT GOES HERE")
        .settings.css("margin","50px")
        .print()
    ,

    newButton("Next","Next")
        .center()
        .print()
        .wait()
)

newTrial("intro" ,
    newText("INSTRUCTIONS GO HERE")
        .settings.css("margin","50px")
        .print()
    ,

    newTextInput("ProlificID")
        .before(newText("ID", "Your Prolific ID:<p>").settings.css("margin", "50px"))
        .settings.css('width', '30%')
        .settings.css('margin', 'auto')
        .print()
        .log()
    ,

    newButton("Next","Next")
        .center()
        .settings.css("margin", "80px")
        .print()
        .wait()
)

newTrial("instruction",
    newText("Instr", "INSTRUCTIONS GO HERE")
        .settings.css("margin", "80px")
        .print()
    ,

    newButton("Click","Click here to begin practice trials!")
        .center()
        .settings.css("margin", "80px")
        .print()
        .wait()
)

PennController.Template("practice.csv", variable => ["trial_prac",
        "DashedSentence", {s: variable.Sentence, mode: "speeded acceptability", display: "in place",
                           blankText: '+', wordTime: 325, wordPauseTime: 0},
        'Question', {q: 'Was the sentence grammatical?', as: [['f', 'Yes'], ['j', 'No']],
                           randomOrder: false, presentHorizontally: true, timeout: 2000},
        'Separator', {transfer: 2000, normalMessage: '+', errorMessage: 'Timed out. Please respond more quickly.'}
                           
    ]
)


newTrial("instruction2",
    newText("Instr2", "POST-PRACTICE INSTRUCTIONS GO HERE")
        .settings.css("margin", "80px")
        .print()
    ,

    newButton("Click","Click here to begin the experiment")
        .center()
        .settings.css("margin", "80px")
        .print()
        .wait()
)

// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial("bye" ,
    newText("Thank you for your participation! Please go to the following web page to verify your participation: <a href='https://app.prolific.co/submissions/complete?cc=728AA2CF'> https://app.prolific.co/submissions/complete?cc=728AA2CF</a>.")
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar" , false)
// Make sure the progress bar is full upon reaching this last (non-)trial