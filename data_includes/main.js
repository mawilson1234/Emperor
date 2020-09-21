PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()

//var counterOverride = 1;
PennController.SetCounter( 'setcounter' );

Sequence('setcounter', 'consent', 'intro', 'instruction', randomize('trial_prac'), 'instruction2',/*
         rshuffle('trial_agr-att', 'trial_that', 'trial_experiencer', 'trial_filler', 'trial_whif'),*/
         'feedback', SendResults(), 'bye')

newTrial('consent',
    newText('CONSENT GOES HERE')
        .settings.css('margin','50px')
        .print()
    ,

    newButton('Next','Next')
        .center()
        .print()
        .wait()
)

newTrial('intro',
    newText('INSTRUCTIONS GO HERE')
        .settings.css('margin','80px')
        .print()
    ,

    newTextInput('ProlificID')
        .before(newText('ID', 'Your Prolific ID:<p>').settings.css('margin', '50px'))
        .settings.css('width', '30%')
        .print()
        .log()
    ,

    newFunction( () =>
        $("textarea.PennController-ProlificID").bind('keyup', e=>
            getTextInput('ProlificID').test.text(/\w/)
              .success( getButton('Next').enable() )
              .failure( getButton('Next').disable() )
              ._runPromises()
        )
    ).call()
    ,
    newButton('Next','Next')
        .center()
        .settings.css('margin', '80px')
        .print()
        .disable()
        .wait()
)

newTrial('instruction',
    newText('Instr', 'INSTRUCTIONS GO HERE')
        .settings.css('margin', '80px')
        .print()
    ,

    newButton('Click','Click here to begin practice trials!')
        .center()
        .settings.css('margin', '80px')
        .print()
        .wait()
)

PennController.Template('practice.csv', variable => ['trial_prac',
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000, 
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Sentence)
   ]
)

newTrial('instruction2',
    newText('Instr2', 'POST-PRACTICE INSTRUCTIONS GO HERE')
        .settings.css('margin', '80px')
        .print()
    ,

    newButton('Click','Click here to begin the experiment')
        .center()
        .settings.css('margin', '80px')
        .print()
        .wait()
)

/*PennController.Template('agr-att.csv', variable => ['trial_agr-att',
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000, 
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Gram)
        .log(variable.Match)
        .log(variable.Comp)
        .log(variable.Sentence)
   ]
)

PennController.Template('that.csv', variable => ['trial_that',
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000, 
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Extraction)
        .log(variable.Comp)
        .log(variable.Sentence)
   ]
)

PennController.Template('experiencer.csv', variable => ['trial_experiencer',
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000, 
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Verb Type)
        .log(variable.Verb)
        .log(variable.Sentence Voice)
        .log(variable.Verb Frequency)
        .log(variable.Verb Length)
        .log(variable.Emotional Valence)
        .log(variable.EV Pair Type)
        .log(variable.Sentence)
   ]
)

PennController.Template('fillers.csv', variable => ['trial_filler',
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000, 
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Gram)
        .log(variable.Type)
        .log(variable.Sentence)
   ]
)

PennController.Template('whif.csv', variable => ['trial_whif',
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000, 
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Structure)
        .log(variable.Gap Position)
        .log(variable.Sentence)
   ]
)*/

PennController('feedback',
    newText('feedback_instruction','Do you have any feedback on the experiment or how you were making your decisions? (Optional)')
        .settings.css('margin', '50px')
        .print()
    ,
    newTextInput('feedback', '')
        .cssContainer('text-align', 'center')
        .log()
        .lines(10)
        .size(400, 200)
        .print()
    ,
    newText('bot_instructions',
            'Respond to the following prompt to show that you are not a bot: describe something interesting you\'d see while driving to the mall.')
        .settings.css('margin', '50px')
    ,
    newTextInput('bot_check')
        .cssContainer('text-align', 'center')
        .log()
        .lines(10)
        .size(400, 200)
        .print()
    ,
     newFunction( () =>
        $("textarea.PennController-bot_check").bind('keyup', e=>
            getTextInput('bot_check').test.text(/\w/)
              .success( getButton('Send').enable() )
              .failure( getButton('Send').disable() )
              ._runPromises()
        )
    ).call()
    ,
    newButton('Send', 'Send Results')
        .settings.css()
        .print()
        .disable()
        .wait(getTextInput('bot_check').testNot.text(''))
        .enable()
        .wait()
)

// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial('bye' ,
    newText('Thank you for your participation! Please go to the following web page to verify your participation: <a href="https://app.prolific.co/submissions/complete?cc=XXXXXXX">https://app.prolific.co/submissions/complete?cc=XXXXXXX</a>.')
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption('countsForProgressBar' , false)
// Make sure the progress bar is full upon reaching this last (non-)trial