import React from 'react'
import * as PDFUtils from './pdf-builder'
import * as jsPDF from 'jspdf'

const cardData = {
    properties: {
        pageWidth: 210,
        pageHeight: 297,
        pageOrientation: 'portrait',
        format: 'A4',
        unit: 'mm',
        cardWidth: 63,
        cardHeight: 88,
        cardRightOffset: 0,
    },
    cards: [
        {
            id: 0,
            face: [
                {
                    type: 'text',
                    content: 'test'
                }
            ],
            back: [

            ]
        }
    ]
}

export default class CardMaker extends React.Component {

    state = {

    }

    generateCards = () => {
        var doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          width: 210,
          height: 297,
          format: 'A4'
        })

        let pageWidth = 210
        let pageHeight = 297
        let pagePadding = 7
        let cardWidth = 63
        let cardHeight = 88
        let cardRightOffset = 1
        let cardBottomOffset = 1

        let nrCardsX = (pageWidth - (2 * pagePadding)) / (cardWidth + cardRightOffset)
        nrCardsX = Math.floor(nrCardsX)
        let nrCardsY = (pageHeight - (2 * pagePadding)) / (cardHeight + cardBottomOffset)
        nrCardsY = Math.floor(nrCardsY)

        for (let j = 0; j < nrCardsY; j++) {
            for (let i = 0; i < nrCardsX; i++) {
                let index = i + j * nrCardsX
                let totalXOffest = pagePadding + i * (cardWidth + cardRightOffset)
                let totalYOffest = pagePadding + j * (cardHeight + cardBottomOffset)

                this.createBasicCard(doc, totalXOffest, totalYOffest, cardWidth, cardHeight)
            }
        }

        doc.addPage()

        doc.setPage(2)

        // cards back
        let extraXOffset = pageWidth - pagePadding - (nrCardsX * (cardWidth + cardRightOffset))
        for (let j = 0; j < nrCardsY; j++) {
            for (let i = 0; i < nrCardsX; i++) {
                let index = i + j * nrCardsX
                let totalXOffest = extraXOffset + i * (cardWidth + cardRightOffset)
                let totalYOffest = pagePadding + j * (cardHeight + cardBottomOffset)

                this.createBasicCard(doc, totalXOffest, totalYOffest, cardWidth, cardHeight,
                    `
                    Behavioral Contrast

                    Definition: The theory defining how behavior can shift greatly based on changed expectations.

                    Example: A monkey presses a lever and is given lettuce. The monkey is happy and continues to press the lever. Then it gets a grape one time. The monkey is delighted. The next time it presses the lever it gets lettuce again. Rather than being happy, as it was before, it goes ballistic throwing the lettuce at the experimenter. (In some experiments, a second monkey is placed in the cage, but tied to a rope so it can’t access the lettuce or lever. After the grape reward is removed, the first monkey beats up the second monkey even though it obviously had nothing to do with the removal. The anger is truly irrational.)
                    `
                )
            }
        }


        doc.save('cards.pdf')
    }

    createBasicCard = (doc, x, y, width, height, text = 'Hello World') => {
        let borderWidth = 1

        doc.setFillColor(0, 0, 0)
        doc.rect(x, y, width, height, 'F');

        doc.setFillColor(255, 255, 255)
        doc.rect(x + borderWidth, y + borderWidth, width - 2 * borderWidth, height - 2 * borderWidth, 'F');

        doc.setFontSize(9)
        doc.text(text, x + 3, y + 10, {
            maxWidth: width - 10
        })
    }

    render = () => {

        return (
            <div>
                <button onClick={this.generateCards}>Generate Cards</button>
            </div>
        )
    }
}
